import { render, screen, fireEvent, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import ReusableTable from './index';
import { Dictionary } from '@/types';
// import { describe, expect, it, test, } from '@jest/globals'
type ReusableTableProp = {
    title: string,
    headerList: Array<{ name: string; hasSort: boolean; accessor: string }>,
    hasDownloadBtn: boolean,
    handleExport: () => void,
    hasCheck: boolean,
    dataList: Array<Dictionary>,
  };


describe('ReusableTable', () => {
  let mockProps:ReusableTableProp= {
    title: 'Test Table',
    headerList: [
      { name: 'Name', hasSort: true, accessor: 'name' },
      { name: 'Type', hasSort: true, accessor: 'type' },
    ],
    hasDownloadBtn: true,
    handleExport: jest.fn(),
    hasCheck: true,
    dataList: [
      { _id: '1', name: 'Item 1', type: 'Type A' },
      { _id: '2', name: 'Item 2', type: 'Type B' },
    ],
  };


it('should render the table with the correct title when provided', () => {
  render(<ReusableTable {...mockProps} />);
  const titleElement = screen.getByText('Test Table');
  expect(titleElement).toBeInTheDocument();
  expect(titleElement).toHaveClass('text-md font-normal text-clr_gray_600 tracking-wide lg:text-');
});

it('should display the download button when hasDownloadBtn is true', () => {
  mockProps = {
    ...mockProps,
    hasDownloadBtn: true,
  };

  render(<ReusableTable {...mockProps} />);
  
  const downloadButton = screen.getByRole('button', { name: /Download all/i });
  expect(downloadButton).toBeInTheDocument();
  expect(downloadButton).toHaveTextContent('Download all');
  expect(downloadButton).toHaveClass('flex gap-2 font-normal text-gray-700');
});


it('should render the correct number of columns based on the headerList prop', () => {
  const mockProps = {
    headerList: [
      { name: 'Name', hasSort: true, accessor: 'name' },
      { name: 'Type', hasSort: true, accessor: 'type' },
      { name: 'Date', hasSort: false, accessor: 'date' },
    ],
    dataList: [
      { _id: '1', name: 'Item 1', type: 'Type A', date: '2023-01-01' },
      { _id: '2', name: 'Item 2', type: 'Type B', date: '2023-01-02' },
    ],
  };

  render(<ReusableTable {...mockProps} />);

  const tableHeaders = screen.getAllByRole('columnheader');
  expect(tableHeaders).toHaveLength(mockProps.headerList.length + 1); // +1 for the action column

  const firstRow = screen.getAllByRole('row')[1];
  const cells = within(firstRow).getAllByRole('cell');
  expect(cells).toHaveLength(mockProps.headerList.length + 1); // +1 for the action column
});

it('should filter out the _id field from being displayed in the table rows', () => {
  const mockProps = {
    headerList: [
      { name: 'Name', hasSort: true, accessor: 'name' },
      { name: 'Type', hasSort: true, accessor: 'type' },
    ],
    dataList: [
      { _id: '1', name: 'Item 6', type: 'Type A' },
      { _id: '2', name: 'Item 4', type: 'Type B' },
    ],
  };

  render(<ReusableTable {...mockProps} />);

  const tableRows = screen.getAllByRole('row');
  
  // Skip the header row
  const dataRows = tableRows.slice(1);

  dataRows.forEach((row) => {
    const cells = within(row).getAllByRole('cell');
    cells.forEach((cell) => {
      expect(cell).not.toHaveTextContent('1');
      expect(cell).not.toHaveTextContent('2');
    });
    expect(within(row).queryByText('_id')).not.toBeInTheDocument();
  });

  expect(screen.queryByText('_id')).not.toBeInTheDocument();
});

it('should call the handleExport function when the download button is clicked', () => {
  const mockHandleExport = jest.fn();
  const mockProps = {
    title: 'Test Table',
    headerList: [
      { name: 'Name', hasSort: true, accessor: 'name' },
      { name: 'Type', hasSort: true, accessor: 'type' },
    ],
    hasDownloadBtn: true,
    handleExport: mockHandleExport,
    dataList: [
      { _id: '1', name: 'Item 1', type: 'Type A' },
      { _id: '2', name: 'Item 2', type: 'Type B' },
    ],
  };

  render(<ReusableTable {...mockProps} />);
  
  const downloadButton = screen.getByRole('button', { name: /Download all/i });
  fireEvent.click(downloadButton);

  expect(mockHandleExport).toHaveBeenCalledTimes(1);
});

it('should render the table without checkboxes when hasCheck is false', () => {
  const mockProps = {
    headerList: [
      { name: 'Name', hasSort: true, accessor: 'name' },
      { name: 'Type', hasSort: true, accessor: 'type' },
    ],
    dataList: [
      { _id: '1', name: 'Item 1', type: 'Type A' },
      { _id: '2', name: 'Item 2', type: 'Type B' },
    ],
    hasCheck: false,
  };

  render(<ReusableTable {...mockProps} />);

  const checkboxes = screen.queryAllByRole('checkbox');
  expect(checkboxes).toHaveLength(0);

  const tableHeaders = screen.getAllByRole('columnheader');
  expect(tableHeaders).toHaveLength(mockProps.headerList.length + 1); // +1 for the action column

  const tableRows = screen.getAllByRole('row');
  expect(tableRows).toHaveLength(mockProps.dataList.length + 1); // +1 for the header row

  mockProps.dataList.forEach((item) => {
    expect(screen.getByText(item.name)).toBeInTheDocument();
    expect(screen.getByText(item.type)).toBeInTheDocument();
  });
});

});