import { db } from './firebase';
import { 
  collection, 
  addDoc, 
  query, 
  where, 
  getDocs, 
  Timestamp 
} from 'firebase/firestore';
import { RATE_LIMIT } from '../config/credentials';

export async function checkRateLimit(userId: string): Promise<boolean> {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const analysesRef = collection(db, 'analyses');
  const q = query(
    analysesRef,
    where('userId', '==', userId),
    where('timestamp', '>=', Timestamp.fromDate(today))
  );

  const querySnapshot = await getDocs(q);
  return querySnapshot.size < RATE_LIMIT.maxAnalysesPerDay;
}

export async function recordAnalysis(userId: string, analysisData: any) {
  const analysesRef = collection(db, 'analyses');
  await addDoc(analysesRef, {
    userId,
    ...analysisData,
    timestamp: Timestamp.now()
  });
}

export function parseAnalysisResponse(content: string) {
  // Split the content into sections
  const sections = content.split('\n\n');
  
  // Initialize the result structure
  const result = {
    problems: [],
    tools: [],
    solutions: [],
    benefits: [],
    summary: {
      costImpact: '',
      quickWins: [],
      strategicRecommendations: []
    }
  };

  let currentSection = '';
  
  // Parse the content
  sections.forEach(section => {
    if (section.includes('Common Problems:')) {
      currentSection = 'problems';
    } else if (section.includes('Current Tools & Limitations:')) {
      currentSection = 'tools';
    } else if (section.includes('Recommended Solutions:')) {
      currentSection = 'solutions';
    } else if (section.includes('Benefits & ROI:')) {
      currentSection = 'benefits';
    } else if (section.includes('Total potential cost impact:')) {
      result.summary.costImpact = section.split(':')[1].trim();
    } else if (section.includes('Quick wins:')) {
      result.summary.quickWins = section
        .split('\n')
        .slice(1)
        .filter(line => line.trim())
        .map(line => line.replace('-', '').trim());
    } else if (section.includes('Strategic recommendations:')) {
      result.summary.strategicRecommendations = section
        .split('\n')
        .slice(1)
        .filter(line => line.trim())
        .map(line => line.replace('-', '').trim());
    }
    
    // Parse table data
    if (section.includes('|') && currentSection) {
      const rows = section
        .split('\n')
        .filter(row => row.includes('|'))
        .slice(2); // Skip header and separator rows
      
      rows.forEach(row => {
        const cells = row
          .split('|')
          .slice(1, -1)
          .map(cell => cell.trim());
        
        if (cells.length > 0) {
          switch (currentSection) {
            case 'problems':
              result.problems.push({
                problem: cells[0],
                cost: cells[1],
                impact: cells[2],
                causes: cells[3]
              });
              break;
            case 'tools':
              result.tools.push({
                problem: cells[0],
                tools: cells[1],
                limitations: cells[2],
                inefficiencies: cells[3]
              });
              break;
            case 'solutions':
              result.solutions.push({
                problem: cells[0],
                solution: cells[1],
                complexity: cells[2],
                timeline: cells[3]
              });
              break;
            case 'benefits':
              result.benefits.push({
                problem: cells[0],
                benefits: cells[1],
                savings: cells[2],
                value: cells[3],
                timeline: cells[4]
              });
              break;
          }
        }
      });
    }
  });

  return result;
}