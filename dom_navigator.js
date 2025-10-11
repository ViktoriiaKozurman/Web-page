function processNode(node, nextCallback, prevCallback, isFirst, isLast) {
    let nodeInfo = `Тег: <${node.tagName.toLowerCase()}>`;
    
    const textContent = node.textContent ? node.textContent.trim().substring(0, 50).replace(/\n/g, ' ') + '...' : 'Немає тексту';
    nodeInfo += `\nВміст (початок): "${textContent}"`;
    
    let promptMessage = `*** Поточний вузол (${isFirst ? 'Перший' : isLast ? 'Останній' : 'Проміжний'}) ***\n\n${nodeInfo}\n\n`;
    let options;

    if (isFirst) {
        options = "Введіть:\n1: Просунутися до наступного вузла\n0: Завершити роботу";
    } else if (isLast) {
        options = "Введіть:\n2: Повернутися до попереднього вузла\n0: Завершити роботу";
    } else {
        options = "Введіть:\n1: Пройти далі (Наступний)\n2: Повернутися (Попередній)\n0: Завершити роботу";
    }

    const userChoice = prompt(promptMessage + options);

    if (userChoice === '1' && !isLast) {
        nextCallback();
    } else if (userChoice === '2' && !isFirst) {
        prevCallback();
    } else if (userChoice === '0' || userChoice === null) {
        alert("Роботу завершено. Дякуємо за використання DOM-навігатора!");
        return;
    } else {
        processNode(node, nextCallback, prevCallback, isFirst, isLast); 
    }
}

function traverseDOM() {
    const allNodes = Array.from(document.body.querySelectorAll('*'));
    
    if (allNodes.length === 0) {
        alert("На сторінці не знайдено елементів для обходу.");
        return;
    }

    let currentIndex = 0;

    const handler = () => {
        if (currentIndex < 0 || currentIndex >= allNodes.length) {
            alert("Помилка індексу обходу. Роботу завершено.");
            return;
        }

        const currentNode = allNodes[currentIndex];
        const isFirst = currentIndex === 0;
        const isLast = currentIndex === allNodes.length - 1;

        const nextCallback = () => {
            currentIndex++;
            handler(); 
        };

        const prevCallback = () => {
            currentIndex--;
            handler(); 
        };

        processNode(currentNode, nextCallback, prevCallback, isFirst, isLast);
    };

    if(confirm("Натисніть 'OK', щоб розпочати покроковий обхід DOM-дерева. Після цього з'явиться серія діалогових вікон (prompt).")) {
        handler();
    }
}

document.addEventListener('DOMContentLoaded', traverseDOM);