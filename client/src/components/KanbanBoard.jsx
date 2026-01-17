import React from "react";
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  useDroppable,
  useDraggable,
} from "@dnd-kit/core";

const COLUMNS = ["Applied", "Interview", "Offer", "Rejected"];

function statusPill(status) {
  const map = {
    Applied: "secondary",
    Interview: "primary",
    Offer: "success",
    Rejected: "danger",
  };
  return `badge bg-${map[status] || "secondary"} pill`;
}

export default function KanbanBoard({ apps, onMove }) {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } })
  );

  const handleDragEnd = ({ active, over }) => {
    if (!over) return;
    const appId = active.id;
    const newStatus = over.id;

    const dragged = apps.find((a) => a._id === appId);
    if (!dragged) return;
    if (dragged.status === newStatus) return;

    onMove(appId, newStatus);
  };

  const byStatus = (s) => apps.filter((a) => a.status === s);

  return (
    <div className="soft-card mb-3">
      <div className="soft-header p-3 d-flex justify-content-between align-items-center">
        <div className="fw-semibold">Kanban Board</div>
        <div className="subtle" style={{ fontSize: 13 }}>
          Drag cards between columns
        </div>
      </div>

      <div className="p-3">
        <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
          <div className="row g-3">
            {COLUMNS.map((col) => (
              <KanbanColumn key={col} id={col} title={col} apps={byStatus(col)} />
            ))}
          </div>
        </DndContext>
      </div>
    </div>
  );
}

function KanbanColumn({ id, title, apps }) {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div className="col-12 col-md-6 col-lg-3">
      <div className="kanban-col p-2" style={{ minHeight: 360 }}>
        <div className="d-flex justify-content-between align-items-center mb-2 px-1">
          <div className="fw-semibold">{title}</div>
          <span className="badge badge-soft pill">{apps.length}</span>
        </div>

        <div
          ref={setNodeRef}
          className="kanban-drop"
          style={{
            outline: isOver ? "2px dashed rgba(99,102,241,0.7)" : "none",
            background: isOver ? "rgba(99,102,241,0.06)" : "transparent",
          }}
        >
          <div className="d-grid gap-2">
            {apps.map((a) => (
              <KanbanCard key={a._id} app={a} />
            ))}

            {apps.length === 0 && (
              <div className="subtle" style={{ fontSize: 13, padding: 8 }}>
                Drop here
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function KanbanCard({ app }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: app._id,
  });

  const style = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    opacity: isDragging ? 0.65 : 1,
    cursor: "grab",
    userSelect: "none",
  };

  return (
    <div ref={setNodeRef} style={style} className="kanban-card p-2" {...listeners} {...attributes}>
      <div className="d-flex justify-content-between align-items-start gap-2">
        <div style={{ minWidth: 0 }}>
          <div className="fw-semibold text-truncate">{app.company}</div>
          <div className="subtle text-truncate" style={{ fontSize: 13 }}>
            {app.role}
          </div>
        </div>

        <span className={statusPill(app.status)} style={{ fontSize: 11 }}>
          {app.status}
        </span>
      </div>

      <div className="d-flex justify-content-between align-items-center mt-2">
        {app.link ? (
          <a href={app.link} target="_blank" rel="noreferrer" style={{ fontSize: 13 }}>
            Link
          </a>
        ) : (
          <span />
        )}

        <span className="subtle" style={{ fontSize: 12 }}>
          {app.dateApplied ? new Date(app.dateApplied).toLocaleDateString() : ""}
        </span>
      </div>
    </div>
  );
}
