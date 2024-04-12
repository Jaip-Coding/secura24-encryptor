// Secura24 Encryptor

function sortChars(list, char1, char2) {
    let sort_elements = [list[char1], list[char2]];
    [list[char1], list[char2]] = [sort_elements[1], sort_elements[0]];
    return list;
}

let copyButton1 = document.getElementById("copyButton1");
let copyButton2 = document.getElementById("copyButton2");

function encrypt() {
    const possible_chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!"§$%&/()=?+*#-_.:,;<>@ \n';
    const key_chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!"§$%&/()=?+*#-_.:,;<>@';
    let encrypted_chars = '';
    
    let chars_to_use = possible_chars;
    let key_list = [];
    let sort_key = Math.floor(Math.random() * 5);
    let key = '';
    
    for (let char of possible_chars) {
        let random_char = Math.floor(Math.random() * chars_to_use.length);
        encrypted_chars += chars_to_use[random_char];
        chars_to_use = chars_to_use.slice(0, random_char) + chars_to_use.slice(random_char + 1);
        key_list.push(random_char.toString());
    }

    let sort_number = 0;
    while (sort_number + sort_key < key_list.length) {
        key_list = sortChars(key_list, sort_number, sort_number + sort_key);
        sort_number += sort_key * 2;
    }
    
    for (let item of key_list) {
        key += item + key_chars[Math.floor(Math.random() * key_chars.length)];
    }
    key += sort_key;
    
    let user_input = document.getElementById('userInput').innerText;
    let encrypted_result = '';
    
    for (let char of user_input) {
        let char_index = possible_chars.indexOf(char);
        if (char_index !== -1) {
            encrypted_result += encrypted_chars[char_index];
        }
    }

    if (user_input.includes('\n')) {
        encrypted_result = encrypted_result.slice(-1);
    }
    
    document.getElementById('resultOutput').innerText = '' + encrypted_result;
    document.getElementById('keyOutput').innerText = 'Key: ' + key;
    copyButton1.style.opacity = 1;
    copyButton2.style.opacity = 1;
}

function darkMode() {
  document.body.classList.toggle('darkmode');
  if (darkModeBool) {
    darkModeBool = false;
    document.getElementById("ModeToggle").innerText = "Dark Mode";
  }
  else {
    darkModeBool = true;
    document.getElementById("ModeToggle").innerText = "Light Mode";
  }
}

function copyResult() {
  const copyText = document.getElementById("resultOutput").innerText;
  const textArea = document.createElement('textarea');
  textArea.textContent = copyText;
  document.body.append(textArea);
  textArea.select();
  document.execCommand("copy");
  textArea.remove();
}

function copyKey() {
  const getText = document.getElementById("keyOutput").innerText;
  const textArea = document.createElement('textarea');
  const copyText = getText.slice(5);
  textArea.textContent = copyText;
  document.body.append(textArea);
  textArea.select();
  document.execCommand("copy");
  textArea.remove();
}
