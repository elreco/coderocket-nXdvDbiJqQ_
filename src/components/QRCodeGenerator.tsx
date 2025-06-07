import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Download, RefreshCw } from "lucide-react";
import QRCode from "qrcode";

export function QRCodeGenerator() {
  const [qrValue, setQrValue] = useState("https://example.com");
  const [size, setSize] = useState(200);
  const [bgColor, setBgColor] = useState("#FFFFFF");
  const [fgColor, setFgColor] = useState("#000000");
  const [level, setLevel] = useState("M");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Generate QR code using canvas
  useEffect(() => {
    const generateQRCode = async () => {
      if (!canvasRef.current) return;
      
      try {
        // Generate QR code
        await QRCode.toCanvas(canvasRef.current, qrValue, {
          width: size,
          margin: 1,
          color: {
            dark: fgColor,
            light: bgColor
          },
          errorCorrectionLevel: level as "L" | "M" | "Q" | "H"
        });
      } catch (err) {
        console.error("Error generating QR code:", err);
      }
    };

    generateQRCode();
  }, [qrValue, size, bgColor, fgColor, level]);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const url = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = "qrcode.png";
      link.href = url;
      link.click();
    }
  };

  const handleRandomize = () => {
    setQrValue(`https://example.com/${Math.random().toString(36).substring(2, 8)}`);
  };

  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader>
        <CardTitle>QR Code Generator</CardTitle>
        <CardDescription>
          Customize and generate a QR code for any URL or text
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-white rounded-lg shadow-sm">
            <canvas 
              ref={canvasRef} 
              id="qr-code"
              width={size}
              height={size}
              className="block"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="qr-content">QR Code Content</Label>
            <div className="flex space-x-2">
              <Input
                id="qr-content"
                value={qrValue}
                onChange={(e) => setQrValue(e.target.value)}
                placeholder="Enter URL or text"
              />
              <Button variant="outline" size="icon" onClick={handleRandomize}>
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label>QR Code Size: {size}px</Label>
            <Slider
              value={[size]}
              min={100}
              max={400}
              step={10}
              onValueChange={(value) => setSize(value[0])}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fg-color">Foreground Color</Label>
              <div className="flex space-x-2">
                <Input
                  id="fg-color"
                  type="color"
                  value={fgColor}
                  onChange={(e) => setFgColor(e.target.value)}
                  className="w-12 h-10 p-1"
                />
                <Input
                  value={fgColor}
                  onChange={(e) => setFgColor(e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bg-color">Background Color</Label>
              <div className="flex space-x-2">
                <Input
                  id="bg-color"
                  type="color"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="w-12 h-10 p-1"
                />
                <Input
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="error-correction">Error Correction Level</Label>
            <Select value={level} onValueChange={setLevel}>
              <SelectTrigger id="error-correction">
                <SelectValue placeholder="Select level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="L">Low (7%)</SelectItem>
                <SelectItem value="M">Medium (15%)</SelectItem>
                <SelectItem value="Q">Quartile (25%)</SelectItem>
                <SelectItem value="H">High (30%)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={handleDownload}>
          <Download className="mr-2 h-4 w-4" /> Download QR Code
        </Button>
      </CardFooter>
    </Card>
  );
}