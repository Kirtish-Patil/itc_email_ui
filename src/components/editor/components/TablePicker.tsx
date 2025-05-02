import { useState } from "react";
import { useCurrentEditor } from "@tiptap/react";
import "./TablePicker.css";

const maxRows = 10;
const maxCols = 10;

const TablePicker = () => {
  const [hoveredRow, setHoveredRow] = useState(0);
  const [hoveredCol, setHoveredCol] = useState(0);
  const [_, setSelectedSize] = useState({ rows: 0, cols: 0 });
  const [_showgrid, setShowGrid] = useState<boolean>(false);
  const { editor } = useCurrentEditor();

  const handleMouseOver = (row: number, col: number) => {
    setHoveredRow(row);
    setHoveredCol(col);
  };

  const handleClick = (row: number, col: number) => {
    // debugger;
    setSelectedSize({ rows: row, cols: col });
    setShowGrid(false);

    if (editor) {
      editor
        .chain()
        .focus()
        .insertTable({ rows: row, cols: col, withHeaderRow: true })
        .run();
      console.log("editor click");
    }
  };

  const renderGrid = () => {
    const grid = [];
    for (let r = 1; r <= maxRows; r++) {
      // let tuple = []
      for (let c = 1; c <= maxCols; c++) {
        const isHovered = r <= hoveredRow && c <= hoveredCol;
        grid.push(
          <div
            key={`${r}-${c}`}
            className={`w-3 h-3 border border-gray-300 cursor-pointer ${
              isHovered ? "bg-blue-200" : "bg-white"
            }`}
            onMouseOver={() => handleMouseOver(r, c)}
            onClick={() => handleClick(r, c)}
          />
        );
      }
    }

    return grid;
  };

  return (
    <div className=" font-sans">
      <div className="relative p-2">
        <div className="grid grid-cols-10 gap-px">{renderGrid()}</div>
        <div className="text-xs text-blue-900 font-semibold mt-2">
          {hoveredCol > 0 && hoveredRow > 0
            ? `${hoveredCol} x ${hoveredRow}`
            : "0 x 0"}
        </div>
      </div>
    </div>
  );
};

export default TablePicker;
