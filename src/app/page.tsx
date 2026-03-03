import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Plus,
  List,
  Check,
  MoveDownRight,
  SquarePen,
  Trash,
  ListChecks,
  TrashIcon,
  Sigma,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const home = () => {
  return (
    <main className="w-full h-screen bg-gray-100 flex justify-center items-center">
      <Card className="w-lg">
        <CardHeader className="flex gap-2">
          <Input placeholder="Adicionar tarefa" />
          <Button variant={"default"} className="cursor-pointer">
            <Plus /> Cadastrar
          </Button>
        </CardHeader>

        <CardContent>
          <Separator className="mb-4" />

          <div className=" flex gap-2">
            <Badge className="cursor-pointer" variant={"default"}>
              <List /> Todas{" "}
            </Badge>
            <Badge className="cursor-pointer" variant={"outline"}>
              <MoveDownRight /> Não finalizado{" "}
            </Badge>
            <Badge className="cursor-pointer" variant={"outline"}>
              <Check /> Concluidas{" "}
            </Badge>
          </div>

          <div className="mt-4 border-b">
            <div className="h-14 flex justify-between items-center border-b border-t">
              <div className="w-1 h-full bg-green-300"></div>
              <p className="flex-1 px-3 text-sm">Estudar React</p>
              <div className="flex items-center gap-2">
                <SquarePen size={16} className="cursor-pointer" />
                <Trash size={16} className="cursor-pointer" />
              </div>
            </div>
          </div>

          <Dialog>
            <DialogTrigger>Abrir</DialogTrigger>
            <DialogHeader>
              <DialogTitle>Editar Taraefa </DialogTitle>
            </DialogHeader>
            <DialogContent>
              <p>epedro</p>
            </DialogContent>
          </Dialog>

          <div className="flex justify-between mt-4">
            <div className="flex gap-2 ">
              <ListChecks size={18} />
              <p className="text-xs"> Tarefas Concluidas (3/3) </p>
            </div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  className="text-xs h-7 cursor-pointer"
                  variant={"outline"}
                >
                  <TrashIcon /> Limpar tarefas Concluidads
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Tem certeza que deseja excluir X itens ?
                  </AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogAction>Sim</AlertDialogAction>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>

          <div className="h-2 w-full bg-gray-100 rounded-md">
            <div
              className="h-full bg-blue-500 rounded-md mt-4"
              style={{ width: "50%" }}
            ></div>
          </div>

          <div className="flex justify-end items-center mt-2 gap-2">
            <Sigma size={18} />
            <p className="text-xs">3 tarefas no total</p>
          </div>
        </CardContent>
      </Card>
    </main>
  );
};

export default home;
