export interface ResearchItem {
  id: string;
  title: string;
  conference: string;
  year: string;
  status: string;
  link?: string;
  abstract: string;
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
    link: 'https://doi.org/10.1109/SERA65747.2025.11154536',
    abstract:
      'Empirically demonstrated significant learning gains in a N=100 study.',
  },
  {
    id: '2',
    title: 'DEEP LEARNING FOR THIRD MOLAR ANALYSIS ON PANORAMIC RADIOGRAPHS',
    conference: 'Group Research Project',
    year: '2026',
    status: 'Completed (Unpublished)',
    abstract:
      'Developed a deep learning-based approach using Mask R-CNN, Cascade R-CNN, and YOLO11m for automated third molar segmentation and classification. Utilizing a specialized dataset of 20,000 dental images collected from the Middle East to ensure model robustness and diversity. Supervised by: MM Mahbubul Syeed, PhD, Professor, Dept. of CSE, IUB.',
    authors:
      'Safiqul Islam, Zahidul Hasan Bhuiyan, Md. Ashrafuzzaman, Mohammad Khursheed Alam',
  },
];
