import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import Swal from "sweetalert2";

const OptionsCard = ({
  setSongEdit,
  currentLyric,
  setIsOpenForm,
  deleteSong,
}) => {
  const [position, setPosition] = useState("bottom");

  const handleEdit = () => {
    setSongEdit(currentLyric);
    setIsOpenForm(true);
  };

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteSong("/songs/", currentLyric.id);
        Swal.fire({
          title: "Deleted!",
          text: "🗑️Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };

  return (
    <DropdownMenu className="p-4">
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="bg-[var(--tagsBackground)] border-[0.1em] rounded-md"
        >
          Options
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Options</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
          <button className="text-start p-2" onClick={handleEdit}>
            📄Edit Song
          </button>
          <button className="text-start p-2" onClick={handleDelete}>
            🗑️Delete Song
          </button>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default OptionsCard;
