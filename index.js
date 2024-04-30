const Excel = require('exceljs');

function getBusinessDaysOfMonth(year, month) {
    const businessDays = [];
    const daysInMonth = new Date(year, month, 0).getDate();

    for (let day = 1; day <= daysInMonth; day++) {
        const currentDate = new Date(year, month - 1, day);
        const dayOfWeek = currentDate.getDay();

        // Check if the current day is a business day (Monday to Friday)
        if (dayOfWeek >= 1 && dayOfWeek <= 5) {
            const formattedDate = `${currentDate.getDate().toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}`;
            businessDays.push(formattedDate);
        }
    }
    return businessDays;
}


var workbook = new Excel.Workbook();
workbook.xlsx.readFile("./samples/sample.xlsx").then(function () {
    const businessDays = getBusinessDaysOfMonth(2024, 4);
    const beginIndex = 7; //.length
    const initialSumColumnLine = 8;
    const insertLineCount = businessDays.length;
    const worksheet = workbook.getWorksheet(1);


    const firstLineWithHours = worksheet.getRow(beginIndex);
    firstLineWithHours.getCell(1).value = 'GER0175';
    firstLineWithHours.getCell(2).value = 'Gerdau Scrapp';
    firstLineWithHours.getCell(3).value = 'Thiago Albieri';
    firstLineWithHours.getCell(4).value = 'Consultoria de front-end e back-end';

    worksheet.duplicateRow(beginIndex, insertLineCount - 1, true);

    for(const [indexOfDate, dateValue] of Object.entries(businessDays)) {
        const row = worksheet.getRow(Number(beginIndex) + Number(indexOfDate));
        row.getCell(5).value = dateValue;
        row.commit();
    }

    const finalSumRow = worksheet.getRow(initialSumColumnLine + insertLineCount - 1);

    finalSumRow.getCell(6).value = {
        formula: `SUM(F7:F${7 + insertLineCount - 1})`
    };

    finalSumRow.commit();

    return workbook.xlsx.writeFile("resultado.xlsx");
});
