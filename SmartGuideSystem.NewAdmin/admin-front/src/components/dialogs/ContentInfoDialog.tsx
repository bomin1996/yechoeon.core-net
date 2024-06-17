import { IDialogContextData } from "@/contexts/DialogContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/shad-components/ui/dialog";
import { ISGContent } from "@shares/ISGContent";
import { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shad-components/ui/dropdown-menu";
import { Button } from "@/shad-components/ui/button";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

interface Props {
  onClose: () => void;
  content: ISGContent;
}
export function ContentInfoDialog({ onClose, content }: Props) {
  return (
    <Dialog
      defaultOpen={true}
      onOpenChange={(op) => {
        onClose();
      }}
    >
      <DialogContent className="min-w-[960px]  h-[900px] overflow-y-auto bg-[#e8e6da] flex flex-col">
        <DialogHeader>
          <DialogTitle>컨텐츠정보</DialogTitle>
        </DialogHeader>
        <DialogDescription></DialogDescription>

        <div className="w-full grid grid-cols-10 text-left gap-2">
          <span className="col-span-2">속성</span>
          <span className="col-span-8">파일명</span>
          <input
            readOnly={true}
            className="col-span-2 text-left"
            value={content.contentType}
          ></input>
          <input
            readOnly={true}
            className="col-span-8"
            value={content.uploadFileName}
          ></input>
        </div>
        <div className="w-full grid grid-cols-4 gap-2 text-left">
          <span className="">가로해상도</span>
          <span className="">세로해상도</span>
          <span className="">재생시간</span>
          <span className="">크기</span>

          <input readOnly={true} className="" value={content.width}></input>
          <input readOnly={true} className="" value={content.height}></input>
          <input readOnly={true} className="" value={content.duration}></input>
          <input readOnly={true} className="" value={content.size}></input>
        </div>
        <div className=" w-full h-0 flex-1 bg-gray-800 ">
          {content.contentType === "video" ? (
            <video
              src={content.url}
              controls={true}
              // preload="auto"
              className="w-full h-full object-contain"
            />
          ) : (
            <img src={content.url} className="w-full h-full object-contain " />
          )}
        </div>
        <Button className="my-4" onClick={onClose} variant={"default"}>
          닫기
        </Button>
      </DialogContent>
    </Dialog>
  );
}

export default function showContentInfoDialog(
  ctx: IDialogContextData,
  params: {
    content: ISGContent;
  }
) {
  ctx.pushDialog(
    <ContentInfoDialog
      content={params.content}
      onClose={() => ctx.popDialog()}
    />
  );
}

export type Payment = {
  id: string;
  amount: number;
  amount2: number;

  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "amount",
    header: ({ column }) => {
      return (
        <Button
          variant={"ghost"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Amount
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      //const amount = parseInt(row.getValue("amount"));
      const amount = row.original.amount;

      return amount > 10 ? (
        <div className="text-red-500 text-2xl">{amount}</div>
      ) : (
        <div className="text-blue-500 font-bold text-2xl">{amount}</div>
      );
    },
  },
  {
    accessorKey: "amount2",
    header: ({ column }) => {
      return (
        <Button
          variant={"ghost"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Amount2
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    header: "ActionMore",
    id: "actions",
    cell: ({ row }) => {
      // const { email } = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => {}}>
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];


