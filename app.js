const btn = document.querySelector('.talk')
const content = document.querySelector('.content')


function speak(text){
    const text_speak = new SpeechSynthesisUtterance(text);

    text_speak.rate = 1;
    text_speak.volume = 1;
    text_speak.pitch = 1;

    window.speechSynthesis.speak(text_speak);
}

function wishMe(){
    var day = new Date();
    var hour = day.getHours();

    if(hour>=0 && hour<12){
        speak("Good Morning Boss...")
    }

    else if(hour>12 && hour<17){
        speak("Good Afternoon Master...")
    }

    else{
        speak("Good Evenining Sir...")
    }

}

window.addEventListener('load', ()=>{
    speak("Initializing JARVIS..");
    wishMe();
});

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition =  new SpeechRecognition();

recognition.onresult = (event)=>{
    const currentIndex = event.resultIndex;
    const transcript = event.results[currentIndex][0].transcript;
    content.textContent = transcript;
    takeCommand(transcript.toLowerCase());

}

btn.addEventListener('click', ()=>{
    content.textContent = "Listening...."
    recognition.start();
})

function takeCommand(message) {
    if (message.includes('hey') || message.includes('hello')) {
      speak('Hello Sir, How May I Help You?');
    } else if (message.includes('open') && message.includes('google')) {
      window.open('https://google.com', '_blank');
      speak('Opening Google...');
    } else if (message.includes('open') && message.includes('youtube')) {
      window.open('https://youtube.com', '_blank');
      speak('Opening Youtube...');
    } else if (message.includes('open') && message.includes('facebook')) {
      window.open('https://facebook.com', '_blank');
      speak('Opening Facebook...');
    } else if (message.includes('wikipedia')) {
      window.open(`https://en.wikipedia.org/wiki/${message.replace('wikipedia', '')}`, '_blank');
      const finalText = 'This is what I found on Wikipedia regarding ' + message;
      speak(finalText);
    } else if (message.includes('time')) {
      const time = new Date().toLocaleString(undefined, {
        hour: 'numeric',
        minute: 'numeric',
      });
      const finalText = time;
      speak(finalText);
    } else if (message.includes('date')) {
      const date = new Date().toLocaleString(undefined, {
        month: 'short',
        day: 'numeric',
      });
      const finalText = date;
      speak(finalText);
    } else if (message.includes('calculator')) {
      window.open('Calculator:///');
      const finalText = 'Opening Calculator';
      speak(finalText);
    } else if (message.includes('search')) {
      const searchTerm = message.replace('search', '').trim();
      window.open(`https://www.google.com/search?q=${searchTerm.replace(' ', '+')}`, '_blank');
      const finalText = `Here is what I found for ${searchTerm} on Google`;
      speak(finalText);
    } else if (message.includes('weather')) {
      const location = message.replace('weather', '').trim();
      window.open(`https://www.google.com/search?q=weather+${location}`, '_blank');
      const finalText = `Here is the weather forcast for ${location}`;
      speak(finalText);
    } else if (message.includes('news')) {
      const source = message.replace('news', '').trim();
      window.open(`https://www.google.com/search?q=site:${source} news`, '_blank');
      const finalText = `Here are the latest news from ${source}`;
      speak(finalText);
    } else if (message.includes('stock')) {
      const symbol = message.replace('stock', '').trim();
      window.open(`https://www.google.com/search?q=site:finance.yahoo.com+${symbol}`, '_blank');
      const finalText = `Here is the current stock price for ${symbol}`;
      speak(finalText);
    } else if (message.includes('play')) {
      const song = message.replace('play', '').trim();
      window.open(`https://www.youtube.com/results?search_query=${song}`, '_blank');
      const finalText = `Playing ${song} on Youtube`;
      speak(finalText);
    } else if (message.includes('send email')) {
      const recipient = message.replace('send email to', '').trim();
      const subject = prompt('Enter the subject of the email');
      const body = prompt('Enter the body of the email');
      window.open(`mailto:${recipient}?subject=${subject}&body=${body}`, '_blank');
      const finalText = `Sending email to ${recipient} with subject ${subject} and body ${body}`;
      speak(finalText);
    } else {
      window.open(`https://www.google.com/search?q=${message.replace(' ', '+')}`, '_blank');
      const finalText = 'I found some information for ' + message + ' on Google';
      speak(finalText);
    }
  }