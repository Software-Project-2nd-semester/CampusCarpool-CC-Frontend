export const dateFormat = (date: string) => {
    let newDate: Date;

    if (date.includes('Z')) {
        newDate = new Date(date.replace('Z', ''));
    } else {
        newDate = new Date(date);
    }

    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    };

    const formattedDate = newDate.toLocaleString('ko-KR', options);
    const finalFormattedDate = formattedDate.replace(/(\d{1,2})(:)(\d{2})/, "$1시 $3분");

    return finalFormattedDate;
}
