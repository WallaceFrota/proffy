// função de conversão de horas em minutos
export default function convertHoursToMinutes(time: string) {
    // divindo horário pelo ":" 8:00 e tranformando em tipo numérico
    // map retorna um array de 2 posições [0, 1]
    const [hour, minutes] = time.split(':').map(Number);
    // hora em minutos
    const timeInMinutes = (hour * 60) + minutes;

    return timeInMinutes;
}