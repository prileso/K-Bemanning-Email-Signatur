
import SignatureGenerator from "../components/SigniturGenerator";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
    <Header />
    <main className="flex-grow">
      <SignatureGenerator />
    </main>
    <Footer />
  </div>
  );
}
