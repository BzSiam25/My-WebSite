export interface ResearchItem {
  id: string;
  title: string;
  conference: string;
  year: string;
  status: string;
  dataset?: string;
  models?: string[];
  summary: string;
  paperLink?: string;
  codeLink?: string;
  authors?: string;
}

export const research: ResearchItem[] = [
  {
    id: '1',
    title:
      'An Enhanced Framework for Sustainable Education using Project-Based Learning',
    conference: 'IEEE SERA Conference',
    year: '2025',
    status: 'Published',
    paperLink: 'https://doi.org/10.1109/SERA65747.2025.11154536',
    summary:
      'Empirically demonstrated significant learning gains in a N=100 study focusing on project-based learning methodologies.',
  },
  {
    id: '2',
    title: 'DEEP LEARNING FOR THIRD MOLAR ANALYSIS ON PANORAMIC RADIOGRAPHS',
    conference: 'Group Research Project',
    year: '2026',
    status: 'Completed (Unpublished)',
    dataset: '20,000 panoramic dental radiographs (Middle East)',
    models: ['Mask R-CNN', 'Cascade R-CNN', 'YOLO11m'],
    summary:
      'Developed a robust deep learning-based approach for automated third molar segmentation and classification. Supervised by MM Mahbubul Syeed, PhD.',
    authors:
      'Safiqul Islam, Zahidul Hasan Bhuiyan, Md. Ashrafuzzaman, Mohammad Khursheed Alam',
  },
];
