import { Injectable } from '@nestjs/common';
import * as path from 'path';
import * as ExcelJS from 'exceljs';

@Injectable()
export class ExcelMngService {
  async readExcelFile(fileName: string): Promise<Record<string, any>[]> {
    const filePath = path.join('storage', fileName);
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);

    const worksheet = workbook.worksheets[0];
    const jsonData = [];

    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber === 1) {
        // Skip the header row if you have headers
        return;
      }
      const rowData = {};
      row.eachCell((cell, colNumber) => {
        rowData[`col${colNumber}`] = cell.value;
      });
      jsonData.push(rowData);
    });

    return jsonData;
  }

  async getData(id: string, page: number, count: number, sort: number, sortIndex: number, searchText: string) {
    const jsonData = await this.readExcelFile(id);

    // Implement pagination, sorting, and searching logic here
    let filteredData = jsonData;

    if (searchText) {
      filteredData = filteredData.filter(item =>
        Object.values(item).some(value =>
          value.toString().toLowerCase().includes(searchText.toLowerCase()),
        ),
      );
    }

    if (sort !== undefined && sortIndex !== undefined) {
      filteredData.sort((a, b) => {
        const aValue = Object.values(a)[sortIndex];
        const bValue = Object.values(b)[sortIndex];
        if (aValue < bValue) return sort === 1 ? -1 : 1;
        if (aValue > bValue) return sort === 1 ? 1 : -1;
        return 0;
      });
    }

    const start = (page - 1) * count;
    const end = start + count;
    const paginatedData = filteredData.slice(start, end);

    return {
      data: paginatedData,
      total: filteredData.length,
    };
  }
}