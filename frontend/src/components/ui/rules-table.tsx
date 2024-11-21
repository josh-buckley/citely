interface RulesTableProps {
  headers: string[];
  rows: Record<string, string>[];
}

export function RulesTable({ headers, rows }: RulesTableProps) {
  return (
    <div className="mt-6">
      <div className="rounded-md border">
        <table className="w-full caption-bottom text-sm">
          <thead className="[&_tr]:border-b bg-muted">
            <tr>
              {headers.map((header, index) => (
                <th key={index} className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="[&_tr:last-child]:border-0">
            {rows.map((row, index) => (
              <tr key={index} className="border-b transition-colors hover:bg-muted/50">
                {Object.values(row).map((cell, cellIndex) => (
                  <td key={cellIndex} className="p-4 align-middle">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
