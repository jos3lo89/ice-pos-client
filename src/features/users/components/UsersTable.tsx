import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useUsers } from "../hooks/useUsers";
import { Badge } from "@/components/ui/badge";
import { getRoleIcon } from "../helpers/getRoleIcon";
import {
  CheckCircle2,
  MoreVertical,
  PhoneOff,
  RefreshCw,
  Search,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import LoadingState from "@/components/common/LoadingState";
import ErrorState from "@/components/common/ErrorState";
import { useMemo, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { UsersResponse } from "../interfaces/users.interface";
import ChangeStatusDialog from "./ChangeStatusDialog";

const UsersTable = () => {
  const [selectedUser, setSelectedUser] = useState<UsersResponse | null>(null);
  const [isStatusDialogOpen, setIsStatusDialogOpen] = useState(false);
  const [query, setQuery] = useState("");

  const { users } = useUsers();

  const allUsers = users.data ?? [];

  const filteredUsers = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return allUsers;

    return allUsers.filter((u) => {
      const fullName = (u.full_name ?? "").toLowerCase();
      const username = (u.username ?? "").toLowerCase();
      return fullName.includes(q) || username.includes(q);
    });
  }, [allUsers, query]);

  if (users.isLoading) {
    return <LoadingState message="Obteniendo lista de usuarios..." />;
  }

  if (users.isError) {
    return (
      <ErrorState
        title="Error al cargar usuarios"
        message={users.error?.message || "Ocurrió un problema inesperado."}
        onRetry={() => users.refetch()}
      />
    );
  }

  return (
    <>
      <div className="flex items-center gap-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            placeholder="Buscar por nombre o usuario..."
            className="pl-9 bg-slate-800 border-slate-700 text-slate-100 placeholder:text-slate-500 focus-visible:ring-cyan-500"
          />
        </div>
      </div>
      <div className="rounded-md border border-slate-700 bg-slate-800/50 overflow-hidden shadow-xl">
        <Table>
          <TableHeader className="bg-slate-800">
            <TableRow className="border-slate-700 hover:bg-slate-800">
              <TableHead className="text-slate-300 font-bold">N°</TableHead>
              <TableHead className="text-slate-300 font-bold">Nombre</TableHead>
              <TableHead className="text-slate-300 font-bold">
                Usuario
              </TableHead>
              <TableHead className="text-slate-300 font-bold">Rol</TableHead>
              <TableHead className="text-slate-300 font-bold">
                Teléfono
              </TableHead>
              <TableHead className="text-slate-300 font-bold text-center">
                Estado
              </TableHead>
              <TableHead className="text-right text-slate-300 font-bold">
                Acciones
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user, index) => (
              <TableRow
                key={user.id}
                className="border-slate-700 hover:bg-slate-700/50 transition-colors"
              >
                <TableCell className="font-medium text-slate-400">
                  <span>{index + 1}</span>
                </TableCell>
                <TableCell className="font-medium text-slate-300">
                  <div className="flex flex-col">
                    <span>{user.full_name}</span>
                  </div>
                </TableCell>
                <TableCell className="text-slate-400 font-mono text-xs">
                  {user.username}
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className="bg-slate-900 border-slate-600 text-slate-200 gap-1.5 py-1 px-2.5"
                  >
                    {getRoleIcon(user.role)}
                    <span className="capitalize">{user.role}</span>
                  </Badge>
                </TableCell>
                <TableCell className="text-slate-400">
                  {user.phone || (
                    <div className="inline-flex items-center px-2 py-1 rounded-full bg-red-500/10 text-red-400 text-xs font-medium border border-red-500/20">
                      <PhoneOff className="w-3 h-3 mr-1" /> Sin teléfono
                    </div>
                  )}
                </TableCell>
                <TableCell className="text-center">
                  {user.is_active ? (
                    <div className="inline-flex items-center px-2 py-1 rounded-full bg-green-500/10 text-green-400 text-xs font-medium border border-green-500/20">
                      <CheckCircle2 className="w-3 h-3 mr-1" /> Activo
                    </div>
                  ) : (
                    <div className="inline-flex items-center px-2 py-1 rounded-full bg-red-500/10 text-red-400 text-xs font-medium border border-red-500/20">
                      <XCircle className="w-3 h-3 mr-1" /> Inactivo
                    </div>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-slate-400 hover:text-cyan-400 hover:bg-slate-800 focus-visible:ring-cyan-500"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent
                      align="end"
                      className="bg-slate-800 border-slate-700 text-slate-200 w-48 shadow-xl"
                    >
                      <DropdownMenuLabel className="text-slate-400 text-xs uppercase tracking-wider">
                        Opciones
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator className="bg-slate-700" />

                      <DropdownMenuItem
                        onClick={() => {
                          setSelectedUser(user);
                          setIsStatusDialogOpen(true);
                        }}
                        className="cursor-pointer hover:bg-slate-700 hover:text-cyan-400 focus:bg-slate-700 focus:text-cyan-400 gap-2"
                      >
                        <RefreshCw className="w-4 h-4" />
                        <span>Cambiar estado</span>
                      </DropdownMenuItem>

                      {/* <DropdownMenuItem
                        onClick={() => {
                          console.log(user);
                        }}
                        className="cursor-pointer hover:bg-slate-700 hover:text-cyan-400 focus:bg-slate-700 focus:text-cyan-400 gap-2"
                      >
                        <Edit className="w-4 h-4" />
                        <span>Editar usuario</span>
                      </DropdownMenuItem> */}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <ChangeStatusDialog
        open={isStatusDialogOpen}
        onOpenChange={setIsStatusDialogOpen}
        user={selectedUser}
      />
    </>
  );
};
export default UsersTable;
