import { Camera, Award, Clock } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="py-20 px-4 bg-white dark:bg-gray-800 transition-colors">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-4xl font-bold text-center mb-8 dark:text-white">About Me</h2>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <img src="/photographer.jpg" alt="Photographer" className="rounded-lg shadow-lg" />
          </div>
          <div className="space-y-4">
            <p className="text-lg dark:text-gray-300">
              I'm Jayant, a passionate photographer with over 5 years of experience capturing life's most precious moments. My style is a blend of candid and artistic photography.
            </p>
            <div className="flex items-center gap-3">
              <Camera className="text-gray-600 dark:text-gray-400" />
              <span className="dark:text-white">Equipment: Sony A7III, 24-70mm, 70-200mm</span>
            </div>
            <div className="flex items-center gap-3">
              <Award className="text-gray-600 dark:text-gray-400" />
              <span className="dark:text-white">Awarded Best Wedding Photographer 2022</span>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="text-gray-600 dark:text-gray-400" />
              <span className="dark:text-white">5+ years experience</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}