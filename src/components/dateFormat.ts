export const dateFormat = (date: string) => {
    const newDate = new Date(date);

    // 9시간 추가
    newDate.setHours(newDate.getHours() + 9);

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