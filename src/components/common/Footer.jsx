export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 py-6 text-center">
      <p className="dark:text-white">&copy; {new Date().getFullYear()} Photography Portfolio. All rights reserved.</p>
    </footer>
  );
}