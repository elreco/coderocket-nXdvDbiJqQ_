import { QRCodeGenerator } from "./components/QRCodeGenerator";

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
      <h1 className="text-3xl font-bold mb-8 text-center">Dynamic QR Code Generator</h1>
      <QRCodeGenerator />
    </div>
  );
}

export default App;