import PbEnhancedElement from '../pb_enhanced_element'

export default class PbTable extends PbEnhancedElement {
    private stickyLeftColumns: string[] = [];
    private handleStickyColumnsRef: () => void;

    static get selector(): string {
        return '.table-responsive-collapse'
    }

    connect(): void {
        // Existing connect method logic
        const tables = document.querySelectorAll('.table-responsive-collapse');
        // Each Table
        [].forEach.call(tables, (table: HTMLTableElement) => {
            // Header Titles
            const headers: string[] = [];
            [].forEach.call(table.querySelectorAll('th'), (header: HTMLTableCellElement) => {
                const colSpan = header.colSpan
                for (let i = 0; i < colSpan; i++) {
                    headers.push(header.textContent.replace(/\r?\n|\r/, ''));
                }
            });
            // for each row in tbody
            [].forEach.call(table.querySelectorAll('tbody tr'), (row: HTMLTableRowElement) => {
                // for each cell
                [].forEach.call(row.cells, (cell: HTMLTableCellElement, headerIndex: number) => {
                    // apply the attribute
                    cell.setAttribute('data-title', headers[headerIndex])
                })
            })
        });

        // New sticky columns logic
        this.initStickyColumns();
    }

    private initStickyColumns(): void {
        // Check if the table has sticky left columns class
        const tables = document.querySelectorAll('.sticky-left-column');

        tables.forEach((table) => {
            // Extract sticky left column IDs from headers
            this.stickyLeftColumns = Array.from(table.querySelectorAll('th'))
                .filter(header => header.id)
                .map(header => header.id);

            if (this.stickyLeftColumns.length > 0) {
                this.handleStickyColumnsRef = this.handleStickyColumns.bind(this);
                this.handleStickyColumns();
                window.addEventListener('resize', this.handleStickyColumnsRef);
            }
        });
    }

    private handleStickyColumns(): void {
        let accumulatedWidth = 0;

        this.stickyLeftColumns.forEach((colId, index) => {
            const isLastColumn = index === this.stickyLeftColumns.length - 1;
            const header = document.querySelector(`th[id="${colId}"]`);
            const cells = document.querySelectorAll(`td[id="${colId}"]`);

            if (header) {
                header.classList.add('sticky');
                (header as HTMLElement).style.left = `${accumulatedWidth}px`;

                if (!isLastColumn) {
                    header.classList.add('with-border');
                    header.classList.remove('sticky-shadow');
                } else {
                    header.classList.remove('with-border');
                    header.classList.add('sticky-shadow');
                }

                accumulatedWidth += (header as HTMLElement).offsetWidth;
            }

            cells.forEach((cell) => {
                cell.classList.add('sticky');
                (cell as HTMLElement).style.left = `${accumulatedWidth - (header as HTMLElement).offsetWidth}px`;

                if (!isLastColumn) {
                    cell.classList.add('with-border');
                    cell.classList.remove('sticky-shadow');
                } else {
                    cell.classList.remove('with-border');
                    cell.classList.add('sticky-shadow');
                }
            });
        });
    }

    // Cleanup method to remove event listener
    disconnect(): void {
        if (this.handleStickyColumnsRef) {
            window.removeEventListener('resize', this.handleStickyColumnsRef);
        }
    }
}