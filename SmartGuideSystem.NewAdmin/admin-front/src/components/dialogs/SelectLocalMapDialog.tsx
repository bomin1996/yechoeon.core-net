import { IDialogContextData } from "@/contexts/DialogContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/shad-components/ui/dialog";
import { ISGLocalMap } from "@shares/ISGContent";
import { ColumnDef } from "@tanstack/react-table";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/shad-components/ui/command";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shad-components/ui/popover";

import { Button } from "@/shad-components/ui/button";
import {
  Check,
  ChevronsUpDown,
} from "lucide-react";
import { useEffect, useState } from "react";

import { LocalMapApi } from "@/server/localMapApi";
import { cn } from "@/lib/utils";
import React from "react";
import { Input } from "@/shad-components/ui/input";
import { DataTable } from "@/shad-components/ui/data-table";

export const columns: ColumnDef<ISGLocalMap>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
];

interface Props {
  onCancel?: () => void;
  onComplete: (localMap: ISGLocalMap) => void;
}
export function SelectLocalMapDialog({ onCancel, onComplete }: Props) {
  const [localMaps, setLocalMaps] = useState<ISGLocalMap[]>([]);
  const [filterMaps, setFilterMaps] = useState<ISGLocalMap[]>([]);
  const [selectedMap, setSelectedMap] = useState<ISGLocalMap>();
  const [inputFilter, setInputFilter] = useState("");
  const queryLocalMaps = async () => {
    const { result, error } = await LocalMapApi.localMapList();
    if (!error) {
      setLocalMaps(result);
      console.log("maps:", result);
    }
  };

  useEffect(() => {
    queryLocalMaps();
  }, []);

  useEffect(() => {
    const filtedLocalMaps =
      inputFilter.length > 0
        ? localMaps.filter((map) => map.name.includes(inputFilter))
        : localMaps;

    console.log("filterMap:", filtedLocalMaps);

    setFilterMaps(filtedLocalMaps);
  }, [localMaps, inputFilter]);

  return (
    <Dialog defaultOpen={true} onOpenChange={onCancel}>
      <DialogContent className=" bg-white w-[800px] min-h-[700px] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-sm">관내도 선택</DialogTitle>
          <DialogDescription>
            <Command>
              <CommandList>
                <CommandInput
                  placeholder="관내도 검색..."
                  onValueChange={(search) => {
                    setInputFilter(search);
                  }}
                />
                <CommandEmpty>해당하는 관내도가 없습니다.</CommandEmpty>
                <CommandGroup>
                  {localMaps
                    .filter((m) => m.name.includes(inputFilter))
                    ?.map((localMap) => (
                      <CommandItem
                        title={localMap.name}
                        key={localMap.id}
                        onSelect={(currentValue) => {
                          setSelectedMap(localMap);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            selectedMap === localMap
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        {localMap.name}
                      </CommandItem>
                    ))}
                </CommandGroup>
              </CommandList>
            </Command>

            {/* <DataTable columns={columns} data={localMaps} /> */}
          </DialogDescription>
        </DialogHeader>
        <Input
          value={inputFilter}
          onChange={(ev) => setInputFilter(ev.currentTarget.value)}
          placeholder="search"
        />
        <div className="flex-1">
          <DataTable columns={columns} data={filterMaps} />
        </div>
        <div className="justify-center flex space-x-2">
          <Button variant={"default"}>OK</Button>
          <Button variant={"destructive"}>Cancle</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function showSelectLocalMapDialog(
  ctx: IDialogContextData,
  params: Props
) {
  ctx.pushDialog(
    <SelectLocalMapDialog
      key={"showUploadContentDialog"}
      onCancel={() => {
        ctx?.popDialog();
        params.onCancel?.();
      }}
      onComplete={(localMap) => {
        ctx?.popDialog();
        params.onComplete(localMap);
      }}
    />
  );
}

export function LocalMapComboboxDemo({
  onChange,
}: {
  onChange: (map: ISGLocalMap) => void;
}) {
  const [open, setOpen] = React.useState(false);
  const [selectedMap, setSelectedMap] = React.useState<ISGLocalMap>();
  const [localMaps, setLocalMaps] = useState<ISGLocalMap[]>([]);
  const queryLocalMaps = async () => {
    const { result, error } = await LocalMapApi.localMapList();
    if (!error) {
      setLocalMaps(result);
      console.log("maps:", result);
    }
  };

  useEffect(() => {
    queryLocalMaps();
  }, []);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {selectedMap
            ? localMaps.find((framework) => framework === selectedMap)?.name
            : "관내도 선택..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="관내도선택..." />
          <CommandEmpty>No framework found.</CommandEmpty>
          <CommandGroup>
            {localMaps.map((map) => (
              <CommandItem
                key={map.id}
                onSelect={(currentValue) => {
                  setSelectedMap(map);
                  setOpen(false);
                  onChange(map);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    selectedMap === map ? "opacity-100" : "opacity-0"
                  )}
                />
                {map.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
