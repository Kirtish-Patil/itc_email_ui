import "./styles.scss";

import { Color } from "@tiptap/extension-color";
import Underline from "@tiptap/extension-underline";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import { EditorProvider, Extensions } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import MenuBar from "./components/menubar";
import TextAlign from "@tiptap/extension-text-align";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";

const extensions: Extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextAlign.configure({
    types: ["heading", "paragraph"],
    alignments: ["right", "left", "center", "justify"],
  }),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
    },
    orderedList: {
      keepMarks: true,
    },
  }),
  Table.configure({
    resizable: true,
  }),
  TableRow,
  TableHeader,
  TableCell,
  Underline,
  TextStyle,
  Highlight,
];

const Editor = () => {
  return (
    <EditorProvider
      slotBefore={<MenuBar />}
      extensions={extensions}
      editorProps={{
        attributes: {
          class:
            "border-input  placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20  aria-invalid:border-destructive dark:bg-input/30 min-h-16 w-full rounded-md border bg-transparent    px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        },
        // Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro quisquam recusandae doloribus! Libero doloribus suscipit qui veniam! Saepe provident libero est! Doloremque ipsum magnam animi. Molestias porro adipisci impedit necessitatibus assumenda esse tempora blanditiis sint voluptas. Similique iste iure deserunt facilis minima ad labore fugit ducimus sed nisi voluptatibus impedit, ullam maiores soluta corporis eum nam optio. Iure ducimus accusamus aliquid corporis rerum dolores doloribus nostrum. Officia, perferendis quae quidem ea adipisci quia, cum quos, quisquam molestiae eaque ipsum repudiandae illum nostrum modi accusamus sunt deserunt? Perspiciatis impedit deleniti et, placeat provident, ad, dolorum blanditiis sapiente eveniet rem neque quisquam tempore! Reiciendis obcaecati eius, labore numquam deleniti non accusamus esse. Necessitatibus a soluta laudantium distinctio aspernatur ullam illo vero? Doloremque quo incidunt soluta sint unde quod odio eum pariatur, ea at nemo quas, voluptate dolorum repellat! Quos consequuntur mollitia consectetur temporibus odio et natus quisquam eaque dolor ratione ut incidunt nisi, placeat autem est in magnam suscipit iste iusto eos adipisci assumenda doloremque provident. Quia ratione cupiditate ut assumenda, deleniti blanditiis, magni quisquam facere illum, perferendis sint doloremque hic odit dolorum! Corrupti, quaerat, exercitationem temporibus vero dignissimos odio esse pariatur expedita sit laboriosam nemo officiis ducimus doloribus minus nam quidem!
      }}
    />
  );
};

export default Editor;
