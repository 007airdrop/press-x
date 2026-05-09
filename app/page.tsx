import dynamic from "next/dynamic";

const PressToStartApp = dynamic(() => import("@/components/PressToStartApp"), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-[#050510] flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-violet-500 border-t-transparent rounded-full animate-spin" />
    </div>
  ),
});

export default function Home() {
  return <PressToStartApp />;
}
