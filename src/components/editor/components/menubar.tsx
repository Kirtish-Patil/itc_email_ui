import { Toggle } from "@/components/ui/toggle";
import { ToggleGroup } from "@/components/ui/toggle-group";
import { useCurrentEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";

import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  Eraser,
  Grid,
  Highlighter,
  Italic,
  List,
  ListOrdered,
  // LucideIcon,
  Redo,
  Strikethrough,
  Underline,
  Undo,
} from "lucide-react";
import { useMemo } from "react";
// import { getToggleButtons } from "./data";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TooltipContent } from "@radix-ui/react-tooltip";
import TablePicker from "./TablePicker";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

const MenuBar = () => {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  const toggleButtons = useMemo(
    () => [
      {
        value: "bold",
        onClick: () => editor.chain().focus().toggleBold().run(),
        disabled: () => !editor.can().chain().focus().toggleBold().run(),
        Icon: Bold,
        pressed: () => editor.isActive("bold"),
        tooltipContent: "Bold",
      },
      {
        value: "italic",
        onClick: () => editor.chain().focus().toggleItalic().run(),
        disabled: () => !editor.can().chain().focus().toggleItalic().run(),
        Icon: Italic,
        pressed: () => editor.isActive("italic"),
        tooltipContent: "Italic",
      },
      {
        value: "underline",
        onClick: () => editor.chain().focus().toggleUnderline().run(),
        disabled: () => !editor.can().chain().focus().toggleUnderline().run(),
        Icon: Underline,
        pressed: () => editor.isActive("underline"),
        tooltipContent: "Underline",
      },
      {
        value: "strikethrough",
        onClick: () => editor.chain().focus().toggleStrike().run(),
        disabled: () => !editor.can().chain().focus().toggleStrike().run(),
        Icon: Strikethrough,
        pressed: () => editor.isActive("strike"),
        tooltipContent: "Strikethrough",
      },
      {
        value: "clearmarks",
        onClick: () => editor.chain().focus().unsetAllMarks().run(),
        disabled: () => !editor.can().chain().focus().unsetAllMarks().run(),
        Icon: Eraser,
        pressed: () => false,
        tooltipContent: "Unset all marks",
      },
      {
        value: "bulletlist",
        onClick: () => editor.chain().focus().toggleBulletList().run(),
        disabled: () => false,
        Icon: List,
        pressed: () => editor.isActive("bulletList"),
        tooltipContent: "Bullet List",
      },
      {
        value: "Ordered List",
        onClick: () => editor.chain().focus().toggleOrderedList().run(),
        disabled: () => false,
        Icon: ListOrdered,
        pressed: () => editor.isActive("orderedList"),
        tooltipContent: "Ordered List",
      },
      {
        value: "undo",
        onClick: () => editor.chain().focus().undo().run(),
        disabled: () => !editor.can().chain().focus().undo().run(),
        Icon: Undo,
        pressed: () => true,
        tooltipContent: "Undo",
      },
      {
        value: "redo",
        onClick: () => editor.chain().focus().redo().run(),
        disabled: () => !editor.can().chain().focus().redo().run(),
        Icon: Redo,
        pressed: () => true,
        tooltipContent: "Redo",
      },
      {
        value: "highlight",
        onClick: () => editor.chain().focus().toggleHighlight().run(),
        disabled: () => false,
        Icon: Highlighter,
        pressed: () => editor.isActive("highlight"),
        tooltipContent: "Highlight",
      },
      {
        value: "right",
        onClick: () => editor.chain().focus().setTextAlign("right").run(),
        disabled: () => false,
        Icon: AlignRight,
        pressed: () => editor.isActive({ textAlign: "right" }),
        tooltipContent: "Right",
      },
      {
        value: "center",
        onClick: () => editor.chain().focus().setTextAlign("center").run(),
        disabled: () => false,
        Icon: AlignCenter,
        pressed: () => editor.isActive({ textAlign: "center" }),
        tooltipContent: "Center",
      },
      {
        value: "left",
        onClick: () => editor.chain().focus().setTextAlign("left").run(),
        disabled: () => false,
        Icon: AlignLeft,
        pressed: () => editor.isActive({ textAlign: "left" }),
        tooltipContent: "Left",
      },
      {
        value: "justify",
        onClick: () => editor.chain().focus().setTextAlign("justify").run(),
        disabled: () => false,
        Icon: AlignJustify,
        pressed: () => editor.isActive({ textAlign: "justify" }),
        tooltipContent: "justify",
      },
    ],
    []
  );

  // useEffect(() => {
  //   editor.on("update", ({ editor }) => {
  //     // console.log(editor.getHTML());
  //   });
  // }, []);

  return (
    <ToggleGroup type="multiple" className="flex flex-wrap">
      {toggleButtons.map((btn, idx) => (
        <Tooltip key={idx}>
          <TooltipTrigger asChild>
            <Toggle
              onClick={() => btn.onClick()}
              disabled={btn.disabled()}
              pressed={btn.pressed()}
              value={btn.value}
            >
              <btn.Icon className="h-4 w-4" />
            </Toggle>
          </TooltipTrigger>
          <TooltipContent
            side="top"
            className="flex items-center gap-4 text-sm font-semibold shadow-md p-1 bg-blue-500 text-white tracking-wide  mb-2"
          >
            {btn.tooltipContent}
          </TooltipContent>
        </Tooltip>
      ))}
      <Tooltip>
        <TooltipTrigger>
          <input
            type="color"
            onInput={(event) =>
              editor
                .chain()
                .focus()
                .setColor((event.target as HTMLInputElement).value)
                .run()
            }
            value={editor.getAttributes("textStyle").color || "#000000"}
            data-testid="setColor"
            className="border-none cursor-pointer w-[20px] h-[23px]"
          />
          <TooltipContent className="flex items-center gap-4 text-sm font-semibold shadow-md p-1 bg-blue-500 text-white tracking-wide  mb-2">
            font color
          </TooltipContent>
        </TooltipTrigger>
      </Tooltip>
      {/* <Tooltip>
        <TooltipTrigger>
          <TablePicker />
          <TooltipContent className="flex items-center gap-4 text-sm font-semibold shadow-md p-1 bg-blue-500 text-white tracking-wide mb-2">
            table
          </TooltipContent>
        </TooltipTrigger>
      </Tooltip> */}
      <HoverCard>
        <HoverCardTrigger asChild>
          <Toggle value="table">
            <Grid className="h-4 w-4" />
          </Toggle>
        </HoverCardTrigger>
        <HoverCardContent className="bg-white border shadow-md rounded p-2 w-fit" side="bottom">
          <TablePicker />
        </HoverCardContent>
      </HoverCard>
    </ToggleGroup>
  );
};

export default MenuBar;
