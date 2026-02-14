import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCreateOrder } from "../hooks/useOrder";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

type Props = {
  tableId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};
const CreateOrderDialog = ({ tableId, open, onOpenChange }: Props) => {
  const createOrder = useCreateOrder();
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm<{
    notes: string;
  }>({
    defaultValues: {
      notes: "",
    },
  });

  const onSubmit = (data: { notes: string }) => {
    createOrder.mutate(
      {
        table_id: tableId,
        notes: data.notes,
      },
      {
        onSuccess: (data) => {
          onOpenChange(false);
          navigate(`/agregar-item/${data.id}`);
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Crear Orden</DialogTitle>
          <DialogDescription>
            Complete el formulario para crear una nueva orden.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-4">
            <div className="col-span-3">
              <Label>Notas</Label>
              <Textarea
                placeholder="Notas adicionales..."
                className="mt-2"
                {...register("notes")}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={createOrder.isPending}>
              {createOrder.isPending ? "Creando..." : "Crear Orden"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
export default CreateOrderDialog;
