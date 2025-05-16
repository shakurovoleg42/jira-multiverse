import { Container } from "@/components/container";
import Dashboard from "@/components/dashboard";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <Container className="relative mt-20">
      {/* Фиксированная кнопка в правом верхнем углу */}
      <Button className="xl:fixed xl:top-[230px] xl:right-4 xl:z-50">
        Add Tasks
      </Button>
      <div className="pt-4">
        {/* Добавляем отступ сверху для кнопки */}
        <Dashboard />
      </div>
    </Container>
  );
}
