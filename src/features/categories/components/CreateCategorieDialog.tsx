import { useForm } from "react-hook-form";
import { useCategorie } from "../hooks/useCategorie";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createCategorieSchema,
  type CreateCategorieT,
} from "../schemas/categorie.schema";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tags, UserPlus } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CreateCategorieDialog = ({ onOpenChange, open }: Props) => {
  const { createCategorie } = useCategorie();

  const form = useForm<CreateCategorieT>({
    resolver: zodResolver(createCategorieSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const onSubmit = async (values: CreateCategorieT) => {
    createCategorie.mutate(values, {
      onSuccess: () => {
        form.reset();
        onOpenChange(false);
      },
    });
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl bg-slate-800 border-slate-700 text-slate-100">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            <Tags className="w-5 h-5 text-cyan-500" />
            Crear Nueva Categoria
          </DialogTitle>
          <DialogDescription className="text-slate-400">
            Ingresa los datos la nueva categoria. Los campos marcados son
            obligatorios.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 py-2"
          >
            <div className="grid grid-cols-1  gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-300">
                      Nombre <span className="text-red-400">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ej. Carnes"
                        className="bg-slate-900 border-slate-700"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-300">
                      Descripcion
                    </FormLabel>
                    <FormControl>
                      {/* <Input
                        placeholder="la carne es rica"
                        className="bg-slate-900 border-slate-700"
                        {...field}
                      /> */}

                      <Textarea
                        placeholder="la carne es rica"
                        className="bg-slate-900 border-slate-700"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                disabled={createCategorie.isPending}
                className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold"
              >
                {createCategorie.isPending ? "Creando..." : "Crear Categoria"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
export default CreateCategorieDialog;
