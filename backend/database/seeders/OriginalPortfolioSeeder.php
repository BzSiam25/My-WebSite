<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Hero;
use App\Models\About;
use App\Models\Project;
use App\Models\Experience;
use App\Models\Skill;
use App\Models\Education;
use App\Models\Research;
use App\Models\Certificate;
use App\Models\Contact;
use App\Models\CurrentFocus;

class OriginalPortfolioSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Hero
        Hero::truncate();
        Hero::create([
          'name' => 'Md. Bayezid Hasan Siam',
          'short_name' => 'Bayezid Siam',
          'designation' => 'Software Engineer & Applied AI Researcher',
          'subtitle' => 'Building Scalable Web Systems & Intelligent Applications',
          'description' => 'I build intelligent systems that bridge the gap between complex engineering and seamless human experiences.',
          'cta_buttons' => [
              ['label' => 'View Projects', 'link' => '#projects'],
              ['label' => 'Contact Me', 'link' => '/contact'],
          ],
          'social_links' => [
              ['platform' => 'GitHub', 'href' => 'https://github.com/BzSiam25', 'icon' => 'github'],
              ['platform' => 'LinkedIn', 'href' => 'https://linkedin.com/in/md-bayezid-hasan-siam-a8041725b', 'icon' => 'linkedin'],
              ['platform' => 'Email', 'href' => 'mailto:bayazidsiam5678@gmail.com', 'icon' => 'email'],
          ],
        ]);

        // 2. About
        About::truncate();
        About::create([
          'biography' => 'I build intelligent systems that bridge the gap between complex engineering and seamless human experiences.',
          'career_objective' => 'To architect resilient software ecosystems and deploy machine learning models that solve high-impact, real-world problems at scale.',
          'core_strengths' => [
              'System Architecture',
              'Applied AI & Vision',
              'Scalable Web Systems',
              'Open Source Leadership',
          ],
        ]);

        // 3. Current Focus
        CurrentFocus::truncate();
        CurrentFocus::create([
          'title' => 'Computer Vision Pipeline',
          'icon' => 'Eye',
          'what' => 'Building real-time image processing and object detection pipelines.',
          'why' => 'To enable systems to understand and interpret visual data from the physical world.',
          'technology' => ['OpenCV', 'YOLO', 'CUDA', 'Continuous Integration'],
          'progress' => 'Active Research',
          'sort_order' => 1,
          'enabled' => true,
        ]);
        CurrentFocus::create([
          'title' => 'Modern Web Applications',
          'icon' => 'Globe',
          'what' => 'Creating high-performance, cinematic, and responsive web experiences.',
          'why' => 'To deliver premium digital experiences that feel intuitive and engaging.',
          'technology' => ['Next.js', 'Vite', 'Tailwind CSS', 'Framer Motion'],
          'progress' => 'Active Engineering',
          'sort_order' => 2,
          'enabled' => true,
        ]);

        // 4. Experiences
        Experience::truncate();
        Experience::create([
          'company' => 'Purbani Group',
          'role' => 'Assistant Officer',
          'employment_type' => 'Full-time',
          'location' => 'Dhaka, Bangladesh',
          'start_date' => '2026-05-01',
          'current_position' => true,
          'description' => 'Spearheaded the design and implementation of enterprise ERP and inventory management systems. Optimized MySQL database architectures and developed secure, scalable role-based access control, directly driving efficiency in internal business operations.',
          'technologies' => ['PHP', 'MySQL', 'JavaScript', 'HTML', 'CSS', 'Bootstrap', 'AJAX', 'Git'],
          'sort_order' => 1,
          'enabled' => true,
        ]);
        Experience::create([
          'company' => 'SteerWeb',
          'role' => 'WEB DEVELOPER (CONTRACTUAL)',
          'employment_type' => 'Contractual',
          'location' => 'Dhaka, Bangladesh',
          'start_date' => '2025-11-01',
          'current_position' => true,
          'description' => 'Engineered a comprehensive job portal handling multi-module user preferences. Streamlined authentication flows and implemented advanced filtering logic, significantly improving platform performance and delivering a seamless user experience across job and tuition modules.',
          'technologies' => ['ReactJS', 'Node.js', 'MongoDB', 'MySQL'],
          'sort_order' => 2,
          'enabled' => true,
        ]);
        Experience::create([
          'company' => 'Cognifyz Technologies',
          'role' => 'WEB DEVELOPER INTERN (REMOTE)',
          'employment_type' => 'Internship',
          'location' => 'Remote',
          'start_date' => '2024-11-01',
          'end_date' => '2024-12-31',
          'current_position' => false,
          'description' => 'Contributed to core web development initiatives, accelerating the delivery of interactive features and optimizing front-end responsiveness.',
          'technologies' => ['Web Development'],
          'sort_order' => 3,
          'enabled' => true,
        ]);

        // 5. Projects
        Project::truncate();
        Project::create([
          'name' => 'LAUNDRY VAI',
          'slug' => 'laundry-vai',
          'category' => 'Professional',
          'year' => 2024,
          'description' => 'A full-stack B2B2C multi-vendor aggregator platform connecting local laundry service providers directly with customers.',
          'problem_statement' => 'Local laundry services lack a unified digital platform, leading to inefficient booking and tracking for customers.',
          'solution' => 'An O2O (Online-to-Offline) multi-vendor marketplace streamlining order management, payments, and delivery tracking.',
          'tech_stack' => ['Web Development', 'Full-Stack', 'React', 'Laravel', 'MySQL'],
          'live_url' => '#',
          'research_url' => '#',
          'cover_image' => 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2940&auto=format&fit=crop',
          'featured' => true,
          'publish_status' => 'published',
          'enabled' => true,
          'sort_order' => 1,
        ]);
        Project::create([
          'name' => 'HOSPITAL MANAGEMENT SYSTEM',
          'slug' => 'hospital-management-system',
          'category' => 'Personal',
          'year' => 2024,
          'description' => 'A full-stack HMS for managing patient/doctor records and appointment bookings.',
          'problem_statement' => 'Manual record-keeping in clinics leads to scheduling conflicts and lost patient histories.',
          'solution' => 'A centralized dashboard for doctors and patients to seamlessly manage appointments and medical records.',
          'tech_stack' => ['Web Development', 'Full-Stack', 'PHP', 'MySQL'],
          'github_url' => 'https://github.com/BzSiam25',
          'cover_image' => 'https://images.unsplash.com/photo-1551076805-e18690c5e53b?q=80&w=2832&auto=format&fit=crop',
          'featured' => true,
          'publish_status' => 'published',
          'enabled' => true,
          'sort_order' => 2,
        ]);
        Project::create([
          'name' => 'EDU-PAY',
          'slug' => 'edu-pay',
          'category' => 'Academic',
          'year' => 2023,
          'description' => 'A mobile app with a custom password-based payment system for academic fee management.',
          'problem_statement' => 'Traditional academic fee payment methods are often cumbersome and lack secure mobile accessibility.',
          'solution' => 'A specialized mobile payment application tailored specifically for educational institution fee collection.',
          'tech_stack' => ['Mobile Application', 'Payment System', 'Android'],
          'github_url' => 'https://github.com/BzSiam25',
          'cover_image' => 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2940&auto=format&fit=crop',
          'featured' => true,
          'publish_status' => 'published',
          'enabled' => true,
          'sort_order' => 3,
        ]);
        Project::create([
          'name' => 'WEATHER APP',
          'slug' => 'weather-app',
          'category' => 'Personal',
          'year' => 2023,
          'description' => 'A real-time weather update application using OpenWeather API and Android Studio.',
          'problem_statement' => 'Users need instant, location-based weather updates with an intuitive mobile interface.',
          'solution' => 'A native Android application fetching and caching live meteorological data seamlessly.',
          'tech_stack' => ['Android Studio', 'OpenWeather API', 'Mobile Application'],
          'github_url' => 'https://github.com/BzSiam25',
          'cover_image' => 'https://images.unsplash.com/photo-1504608524841-42ce6f1225a4?q=80&w=2940&auto=format&fit=crop',
          'featured' => false,
          'publish_status' => 'published',
          'enabled' => true,
          'sort_order' => 4,
        ]);
        Project::create([
          'name' => 'DEEP LEARNING FOR THIRD MOLAR ANALYSIS',
          'slug' => 'deep-learning-for-third-molar-analysis',
          'category' => 'Research',
          'year' => 2026,
          'description' => 'Deep learning-based approach using Mask R-CNN, Cascade R-CNN, and YOLO11m for automated third molar segmentation.',
          'problem_statement' => 'Manual analysis of panoramic radiographs for third molar classification is time-consuming and prone to human error.',
          'solution' => 'An automated pipeline leveraging state-of-the-art object detection and instance segmentation models.',
          'tech_stack' => ['Mask R-CNN', 'Cascade R-CNN', 'YOLO11m', 'Deep Learning', 'PyTorch'],
          'cover_image' => 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?q=80&w=2864&auto=format&fit=crop',
          'featured' => true,
          'publish_status' => 'published',
          'enabled' => true,
          'sort_order' => 5,
        ]);
        Project::create([
          'name' => 'Sustainable Education via Project-Based Learning',
          'slug' => 'sustainable-education-via-pbl',
          'category' => 'Research',
          'year' => 2025,
          'description' => 'Published Research Paper in IEEE SERA Conference, 2025. Empirically demonstrated significant learning gains.',
          'problem_statement' => 'Traditional lecture-based education models often struggle with long-term student retention and engagement.',
          'solution' => 'A framework integrating project-based learning methodologies into technical curricula.',
          'tech_stack' => ['Project-Based Learning', 'Educational Data Analysis'],
          'live_url' => 'https://doi.org/10.1109/SERA65747.2025.11154536',
          'cover_image' => 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2940&auto=format&fit=crop',
          'featured' => true,
          'publish_status' => 'published',
          'enabled' => true,
          'sort_order' => 6,
        ]);

        // 6. Skills
        Skill::truncate();
        $skillsData = [
          'Web Development' => ['React.js', 'Node.js', 'Express.js', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'Bootstrap', 'PHP'],
          'Enterprise Systems' => ['MySQL', 'MongoDB', 'REST API', 'System Architecture'],
          'AI' => ['Machine Learning', 'Deep Learning', 'TensorFlow', 'PyTorch', 'Scikit-learn', 'NumPy', 'Pandas', 'Model Training', 'Model Evaluation'],
          'Computer Vision' => ['OpenCV', 'YOLO', 'Mask R-CNN', 'Cascade R-CNN', 'EfficientNet-B3', 'Image Classification', 'Object Detection', 'Instance Segmentation', 'Medical Image Analysis'],
          'Dev Tools' => ['Git', 'GitHub', 'VS Code', 'Jupyter', 'Dataset Annotation'],
          'Networking' => ['TCP/IP', 'HTTP/HTTPS', 'API Design'],
        ];
        $order = 1;
        foreach ($skillsData as $category => $skills) {
          foreach ($skills as $s) {
            Skill::create([
              'name' => $s,
              'category' => $category,
              'icon' => 'Code',
              'display_order' => $order++,
              'enabled' => true,
            ]);
          }
        }

        // 7. Education
        Education::truncate();
        Education::create([
          'university' => 'Independent University, Bangladesh',
          'degree' => 'B.Sc in Computer Science and Engineering',
          'department' => 'Computer Science & Engineering',
          'cgpa' => '3.80',
          'duration' => '2020 - 2025',
          'description' => 'Dhaka, Bangladesh',
          'sort_order' => 1,
          'enabled' => true,
        ]);
        Education::create([
          'university' => 'Sirajganj Government College',
          'degree' => 'Higher Secondary Certificate (HSC)',
          'department' => 'Science',
          'cgpa' => '5.00',
          'duration' => '2019',
          'description' => 'Sirajganj, Bangladesh',
          'sort_order' => 2,
          'enabled' => true,
        ]);

        // 8. Research
        Research::truncate();
        Research::create([
          'title' => 'An Enhanced Framework for Sustainable Education using Project-Based Learning',
          'authors' => 'Md. Bayezid Hasan Siam et al.',
          'conference' => 'IEEE SERA Conference',
          'year' => 2025,
          'abstract' => 'Empirically demonstrated significant learning gains in a N=100 study focusing on project-based learning methodologies.',
          'status' => 'Published',
          'paper_link' => 'https://doi.org/10.1109/SERA65747.2025.11154536',
          'featured' => true,
          'publish_status' => 'published',
          'enabled' => true,
        ]);
        Research::create([
          'title' => 'DEEP LEARNING FOR THIRD MOLAR ANALYSIS ON PANORAMIC RADIOGRAPHS',
          'authors' => 'Safiqul Islam, Zahidul Hasan Bhuiyan, Md. Ashrafuzzaman, Mohammad Khursheed Alam',
          'conference' => 'Group Research Project',
          'year' => 2026,
          'abstract' => 'Developed a robust deep learning-based approach for automated third molar segmentation and classification. Supervised by MM Mahbubul Syeed, PhD.',
          'status' => 'Completed (Unpublished)',
          'featured' => true,
          'publish_status' => 'published',
          'enabled' => true,
        ]);

        // 9. Certificates
        Certificate::truncate();
        Certificate::create([
          'title' => 'Cisco Certified Professional',
          'issuer' => 'Cisco',
          'issue_date' => '2024-01-01',
          'sort_order' => 1,
          'enabled' => true,
        ]);

        // 10. Contact
        Contact::truncate();
        Contact::create([
          'email' => 'bayazidsiam5678@gmail.com',
          'phone' => '+8801763271609',
          'location' => 'Bashundhara R/A, Dhaka-1229, Bangladesh',
          'github' => 'https://github.com/BzSiam25',
          'linkedin' => 'https://linkedin.com/in/md-bayezid-hasan-siam-a8041725b',
        ]);
    }
}
