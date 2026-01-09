import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const AnimeCard = ({ item }: { item: any }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{item.title}</CardTitle>
        
      </CardHeader>
      <CardContent>
        <CardDescription>{item.synopsis}</CardDescription>
      </CardContent>
    </Card>
  );
};

export default AnimeCard;
