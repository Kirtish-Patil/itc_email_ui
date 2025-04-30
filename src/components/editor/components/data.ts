import { Editor } from "@tiptap/react";
import {
  Bold,
  Eraser,
  Italic,
  List,
  ListOrdered,
  LucideIcon,
  Redo,
  Strikethrough,
  Underline,
  Undo,
} from "lucide-react";
import { useMemo } from "react";

interface ToggleButtonProps {
  value: string;
  arai_lable?: string;
  onClick: () => void;
  disabled: () => boolean;
  pressed: () => boolean;
  tooltipContent: string;
  Icon: LucideIcon;
}

export const getToggleButtons = (editor: Editor): ToggleButtonProps[] =>
  useMemo(
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
        disabled: () => !editor.can().chain().focus().toggleBulletList().run(),
        Icon: List,
        pressed: () => editor.isActive("bulletList"),
        tooltipContent: "Bullet List",
      },
      {
        value: "Ordered List",
        onClick: () => editor.chain().focus().toggleOrderedList().run(),
        disabled: () => !editor.can().chain().focus().toggleOrderedList().run(),
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
    ],
    []
  );
