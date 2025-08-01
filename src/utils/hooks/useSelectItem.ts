import { Dictionary } from "@/types";

interface useSelectItemProps {
  setState: React.Dispatch<React.SetStateAction<Dictionary[]>>;
  slug: string
}

export default function useSelectItem({ setState, slug }: useSelectItemProps) {

  const handleSelectItem = (id: number | string) => {
    setState((prevState: Dictionary) =>
      prevState.map((item: Dictionary) => {
        return {
          ...item,
          [slug]: item.id === id,
        };
      })
    );
  };

  return { handleSelectItem };
}
