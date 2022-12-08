const form = document.querySelector('form');
let container = document.querySelector('#container');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearContent();
    try {
        const input = document.querySelector('input').value;
        const res = await fetch(`https://api.tvmaze.com/search/shows?q=${input}`);
        const data = await res.json();
        addContent(data);
    }
    catch (e) {console.log('An error occured', e)}
})

const clearContent = () => {
    container.remove();
    container = document.createElement('div')
    document.body.append(container)
    container.setAttribute('id', 'container')
}

const addContent = (data) => {
    for(let item of data){
        try {
            let img = item.show.image.medium;
            let newImg = document.createElement('img');
            let url = item.show.url;
            let imgAnchortag = document.createElement('a');
            newImg.src = img;
            imgAnchortag.setAttribute('href', url);
            imgAnchortag.append(newImg)
            imgAnchortag.setAttribute('target', '_blank')
            container.append(imgAnchortag);
        }
        catch (e) {console.log('No Image avaliable for:', item.show.name)}
    }
}