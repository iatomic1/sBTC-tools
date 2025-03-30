'use client';
import { Badge } from '@ui/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@ui/components/ui/card';
import { ArrowRight, Bitcoin } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

// Mock data generator for BTC inflows and sBTC mints
const generateMockTransaction = () => {
  // Generate a random BTC amount between 0.1 and 5 BTC
  const amount = +(Math.random() * 4.9 + 0.1).toFixed(4);

  // Generate random Bitcoin addresses
  const btcAddress = `bc1q${Array.from(
    { length: 38 },
    () => '0123456789abcdef'[Math.floor(Math.random() * 16)],
  ).join('')}`;

  const stacksAddress = `SP${Array.from(
    { length: 33 },
    () => '0123456789ABCDEFGHJKLMNPQRSTUVWXYZ'[Math.floor(Math.random() * 34)],
  ).join('')}`;

  return {
    id: Math.random().toString(36).substring(2, 15),
    timestamp: new Date(),
    amount,
    btcAddress,
    stacksAddress,
    status: Math.random() > 0.2 ? 'completed' : 'pending',
    confirmations: Math.floor(Math.random() * 6),
  };
};

interface Particle {
  id: string;
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  radius: number;
  speed: number;
  amount: number;
  color: string;
  progress: number;
  completed: boolean;
  timestamp: Date; // Added timestamp property
}

export function BtcSbtcFlowVisualization() {
  const [transactions, setTransactions] = useState<
    ReturnType<typeof generateMockTransaction>[]
  >([]);
  const [recentActivity, setRecentActivity] = useState<
    ReturnType<typeof generateMockTransaction>[]
  >([]);
  const [stats, setStats] = useState({
    totalBtcInflow: 0,
    totalSbtcMinted: 0,
    pendingTransactions: 0,
    averageConfirmationTime: 0,
  });

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const btcNodeRef = useRef<HTMLDivElement>(null);
  const sbtcNodeRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>(0);

  // Generate a new transaction every 3-8 seconds
  useEffect(() => {
    const interval = setInterval(
      () => {
        if (Math.random() > 0.3) {
          // 70% chance of a new transaction
          const newTransaction = generateMockTransaction();
          setTransactions((prev) => [...prev, newTransaction]);
          setRecentActivity((prev) => [newTransaction, ...prev].slice(0, 5));

          // Update stats
          setStats((prev) => ({
            totalBtcInflow: +(
              prev.totalBtcInflow + newTransaction.amount
            ).toFixed(4),
            totalSbtcMinted: +(
              prev.totalSbtcMinted + newTransaction.amount
            ).toFixed(4),
            pendingTransactions:
              prev.pendingTransactions +
              (newTransaction.status === 'pending' ? 1 : 0),
            averageConfirmationTime: Math.floor(Math.random() * 10) + 10, // 10-20 minutes
          }));

          // Create a new particle for animation
          if (btcNodeRef.current && sbtcNodeRef.current) {
            const btcRect = btcNodeRef.current.getBoundingClientRect();
            const sbtcRect = sbtcNodeRef.current.getBoundingClientRect();

            const startX = btcRect.left + btcRect.width / 2;
            const startY = btcRect.top + btcRect.height / 2;
            const endX = sbtcRect.left + sbtcRect.width / 2;
            const endY = sbtcRect.top + sbtcRect.height / 2;

            const newParticle: Particle = {
              id: newTransaction.id,
              x: startX,
              y: startY,
              targetX: endX,
              targetY: endY,
              radius: Math.max(3, Math.min(8, newTransaction.amount)),
              speed: 0.5 + Math.random() * 1.5,
              amount: newTransaction.amount,
              color:
                newTransaction.status === 'completed' ? '#3b82f6' : '#f59e0b',
              progress: 0,
              completed: false,
              timestamp: new Date(), // Initialize timestamp
            };

            particlesRef.current = [...particlesRef.current, newParticle];
          }
        }
      },
      Math.floor(Math.random() * 5000) + 3000,
    );

    return () => clearInterval(interval);
  }, []);

  // Animation loop for particles
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size to match window
    const resizeCanvas = () => {
      const { width, height } = canvas.getBoundingClientRect();
      if (canvas.width !== width || canvas.height !== height) {
        const { devicePixelRatio: ratio = 1 } = window;
        canvas.width = width * ratio;
        canvas.height = height * ratio;
        ctx.scale(ratio, ratio);
      }
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Animation function
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connection line
      if (btcNodeRef.current && sbtcNodeRef.current) {
        const btcRect = btcNodeRef.current.getBoundingClientRect();
        const sbtcRect = sbtcNodeRef.current.getBoundingClientRect();

        const startX = btcRect.left + btcRect.width / 2;
        const startY = btcRect.top + btcRect.height / 2;
        const endX = sbtcRect.left + sbtcRect.width / 2;
        const endY = sbtcRect.top + sbtcRect.height / 2;

        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.strokeStyle = 'rgba(148, 163, 184, 0.2)';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Draw directional arrow in the middle
        const midX = (startX + endX) / 2;
        const midY = (startY + endY) / 2;
        const angle = Math.atan2(endY - startY, endX - startX);

        ctx.save();
        ctx.translate(midX, midY);
        ctx.rotate(angle);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(-10, -5);
        ctx.lineTo(-10, 5);
        ctx.closePath();
        ctx.fillStyle = 'rgba(148, 163, 184, 0.4)';
        ctx.fill();
        ctx.restore();
      }

      // Update and draw particles
      particlesRef.current = particlesRef.current.map((particle) => {
        if (particle.completed) return particle;

        // Update position
        particle.progress += 0.005 * particle.speed;

        if (particle.progress >= 1) {
          particle.progress = 1;
          particle.completed = true;
        }

        // Calculate current position using easing
        const easeInOutCubic = (t: number) =>
          t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2;

        const easedProgress = easeInOutCubic(particle.progress);

        particle.x =
          particle.x + (particle.targetX - particle.x) * easedProgress;
        particle.y =
          particle.y + (particle.targetY - particle.y) * easedProgress;

        return particle;
      });

      // Draw particles using for...of instead of forEach
      for (const particle of particlesRef.current) {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();

        // Draw amount text for larger particles
        if (particle.radius > 5) {
          ctx.font = '10px Arial';
          ctx.fillStyle = 'white';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(particle.amount.toString(), particle.x, particle.y);
        }
      }

      // Remove completed particles after they've been shown for a while
      particlesRef.current = particlesRef.current.filter(
        (p) => !p.completed || Date.now() - p.timestamp.getTime() < 5000,
      );

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationRef.current);
    };
  }, []); // Empty dependency array to run once on mount

  return (
    <Card className="w-full overflow-hidden">
      <CardHeader>
        <CardTitle>BTC → sBTC Real-time Flow</CardTitle>
        <CardDescription>
          Visualizing Bitcoin inflows and sBTC minting in real-time
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="relative h-[200px] w-full">
          <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

          <div className="absolute inset-0 flex items-center justify-between p-8 pointer-events-none">
            <div
              ref={btcNodeRef}
              className="flex flex-col items-center bg-orange-100 dark:bg-orange-950 p-4 rounded-lg border border-orange-300 dark:border-orange-800 shadow-lg"
            >
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-orange-500 mb-2">
                <Bitcoin className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-lg font-bold">Bitcoin Network</h3>
              <p className="text-sm text-muted-foreground">Multi-sig Address</p>
              <Badge
                variant="outline"
                className="mt-2 bg-orange-50 dark:bg-orange-900"
              >
                {stats.totalBtcInflow.toFixed(4)} BTC Inflow
              </Badge>
            </div>

            <div
              ref={sbtcNodeRef}
              className="flex flex-col items-center bg-blue-100 dark:bg-blue-950 p-4 rounded-lg border border-blue-300 dark:border-blue-800 shadow-lg"
            >
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-500 mb-2">
                <Bitcoin className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-lg font-bold">sBTC Token</h3>
              <p className="text-sm text-muted-foreground">
                .sbtc-token Contract
              </p>
              <Badge
                variant="outline"
                className="mt-2 bg-blue-50 dark:bg-blue-900"
              >
                {stats.totalSbtcMinted.toFixed(4)} sBTC Minted
              </Badge>
            </div>
          </div>
        </div>

        <div className="border-t p-4">
          <h3 className="font-medium mb-2">Recent Activity</h3>
          <div className="space-y-2">
            {recentActivity.map((tx) => (
              <div
                key={tx.id}
                className="flex items-center justify-between text-sm"
              >
                <div className="flex items-center">
                  <Badge
                    variant={tx.status === 'completed' ? 'default' : 'outline'}
                    className="mr-2"
                  >
                    {tx.status === 'completed' ? 'Completed' : 'Pending'}
                  </Badge>
                  <span>{tx.amount} BTC</span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <span className="truncate max-w-[100px]">
                    {tx.btcAddress.substring(0, 8)}...
                  </span>
                  <ArrowRight className="h-3 w-3 mx-1" />
                  <span className="truncate max-w-[100px]">
                    {tx.stacksAddress.substring(0, 8)}...
                  </span>
                </div>
                <span className="text-muted-foreground">
                  {Math.floor((Date.now() - tx.timestamp.getTime()) / 1000)} sec
                  ago
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
