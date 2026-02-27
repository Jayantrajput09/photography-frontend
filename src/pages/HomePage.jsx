import Hero from '../components/home/Hero';
import About from '../components/home/About';
import Gallery from '../components/home/Gallery';
import Booking from '../components/home/Booking';
import Reviews from '../components/home/Reviews';
import Contact from '../components/home/Contact';

export default function HomePage() {
  return (
    <main>
      <Hero />
      <About />
      <Gallery />
      <Booking />
      <Reviews />
      <Contact />
    </main>
  );
}