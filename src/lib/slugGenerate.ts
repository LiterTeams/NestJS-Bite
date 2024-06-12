// const translit = (str: string): string => {
//     const Ru = "А-а-Б-б-В-в-Г-г-Д-д-Е-е-Ё-ё-Ж-ж-З-з-И-и-Й-й-К-к-Л-л-М-м-Н-н-О-о-П-п-Р-р-С-с-Т-т-У-у-Ф-ф-Х-х-Ц-ц-Ч-ч-Ш-ш-Щ-щ-Ъ-ъ-Ь-ь-Ы-ы-Э-э-Ю-ю-Я-я".split("-");
//     const Eng = "A-a-B-b-V-v-G-g-D-d-E-e-ZH-zh-Z-z-I-i-J-j-K-k-L-l-M-m-N-n-O-o-P-p-R-r-S-s-T-t-U-u-F-f-H-h-TS-ts-CH-ch-SCH-sch-'-'-Y-y-'-'-YU-yu-YA-ya".split("-");
//     let result = "";
//     for (let i = 0; i < str.length; i++){
//         let s = str.charAt(i);
//         let n = Ru.indexOf(s);
//         if (n >= 0) result += Eng[n]
//         else {result += s}
//     }
//     return result;
// }

// const slugGenerate = (str: string): string => {
//     let url: string = str.replace(/[\s]+/gi, "-");
//     url = translit(url);
//     url = url
//         .replace(/[^0-9a-z_\-]+/gi, "")
//         .replace("---", "-")
//         .replace("--", "-")
//         .toLowerCase();
//     return url;
// }

// export default slugGenerate;

// @ts-nocheck
const slugGenerate = (value:string): string => {
    let answer = "";
    const converter = {
		'а': 'a',    'б': 'b',    'в': 'v',    'г': 'g',    'д': 'd',
		'е': 'e',    'ё': 'e',    'ж': 'zh',   'з': 'z',    'и': 'i',
		'й': 'y',    'к': 'k',    'л': 'l',    'м': 'm',    'н': 'n',
		'о': 'o',    'п': 'p',    'р': 'r',    'с': 's',    'т': 't',
		'у': 'u',    'ф': 'f',    'х': 'h',    'ц': 'c',    'ч': 'ch',
		'ш': 'sh',   'щ': 'sch',  'ь': '',     'ы': 'y',    'ъ': '',
		'э': 'e',    'ю': 'yu',   'я': 'ya',
 
		'А': 'A',    'Б': 'B',    'В': 'V',    'Г': 'G',    'Д': 'D',
		'Е': 'E',    'Ё': 'E',    'Ж': 'Zh',   'З': 'Z',    'И': 'I',
		'Й': 'Y',    'К': 'K',    'Л': 'L',    'М': 'M',    'Н': 'N',
		'О': 'O',    'П': 'P',    'Р': 'R',    'С': 'S',    'Т': 'T',
		'У': 'U',    'Ф': 'F',    'Х': 'H',    'Ц': 'C',    'Ч': 'Ch',
		'Ш': 'Sh',   'Щ': 'Sch',  'Ь': '',     'Ы': 'Y',    'Ъ': '',
		'Э': 'E',    'Ю': 'Yu',   'Я': 'Ya'
	};

    for (let i = 0; i < value.length; ++i ) {
		const word = value[i];
		answer += word in converter ? converter[word] : word
	}
 
	return answer.toLowerCase().replaceAll(" ", "-");
}
export default slugGenerate;