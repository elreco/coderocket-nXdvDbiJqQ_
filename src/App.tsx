import { QRCodeGenerator } from "./components/QRCodeGenerator";
import { Footer } from "./components/Footer";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow flex flex-col items-center justify-center p-4 bg-gray-50">
        <h1 className="text-3xl font-bold mb-8 text-center">Dynamic QR Code Generator</h1>
        <QRCodeGenerator />
      </main>
      <Footer />
    </div>
  );
}

export default App;