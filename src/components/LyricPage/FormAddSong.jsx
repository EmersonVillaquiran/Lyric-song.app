import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import formSongSchema from "@/hooks/formSongSchema";
import getConfigToken from "@/utils/getConfigToken";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

export default function Home({
  createSongs,
  updateSong,
  songEdit,
  setSongEdit,
  isOpenForm,
  setIsOpenForm,
  users,
}) {
  const form = useForm({
    resolver: zodResolver(formSongSchema),
    defaultValues: {
      artist: "",
      name: "",
      lyric: "",
      genre: "",
      url: "",
    },
  });
  useEffect(() => {
    form.reset({
      artist: songEdit?.artist || "",
      name: songEdit?.name || "",
      lyric: songEdit?.lyric || "",
      genre: songEdit?.genre || "",
      url: songEdit?.url || "",
    });
  }, [songEdit]);

  const onSubmit = (data) => {
    if (songEdit) {
      updateSong("/songs/", songEdit.id, data);
      setSongEdit();
    } else {
      data.userId = users.loggedUser?.id;
      createSongs("/songs/", data, getConfigToken());
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: "success",
        title: "Song created successfully",
      });
    }
    setIsOpenForm(false);
    form.reset({
      artist: "",
      name: "",
      lyric: "",
      genre: "",
      url: "",
    });
  };
  const handleOpenChange = (open) => {
    setIsOpenForm(open);
    if (!open) {
      form.reset({
        artist: "",
        name: "",
        lyric: "",
        genre: "",
        url: "",
      });
      setSongEdit();
    }
  };

  return (
    <Dialog  open={isOpenForm} onOpenChange={handleOpenChange}>
      <div className="text-center">
        <DialogTrigger className="bg-[var(--tagsBackground)] border-[0.1em] rounded-md p-2 font-medium">
          <h3>Add Song</h3>
        </DialogTrigger>
      </div>
      <DialogContent className="max-w-[425px] w-full grid">
        <DialogHeader>
          <DialogTitle className="text-center">Add Song</DialogTitle>
          <DialogDescription></DialogDescription>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel></FormLabel>
                    <FormControl>
                      <Input placeholder="Name of song" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="artist"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel></FormLabel>
                    <FormControl>
                      <Input placeholder="Name of artist" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="genre"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel></FormLabel>
                    <FormControl>
                      <Input placeholder="Genre of song" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lyric"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel></FormLabel>
                    <FormControl>
                      <textarea
                        placeholder="Lyric of song"
                        {...field}
                        rows="3" // Ajusta el número de filas según sea necesario
                        style={{
                          width: "100%",
                          resize: "vertical",
                          background: "black",
                        }} // Estilo opcional
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel></FormLabel>
                    <FormControl>
                      <Input placeholder="Url of song from mp3" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full mt-7">
                Submit
              </Button>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
