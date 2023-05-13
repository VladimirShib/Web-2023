//constants and functions for text inputs
const postTitle = document.getElementById('post-title');
const postSubtitle = document.getElementById('post-subtitle');
const articleTitle = document.getElementById('article-title');
const articleSubitle = document.getElementById('article-subtitle');
const postcardTitle = document.getElementById('postcard-title');
const postcardSubitle = document.getElementById('postcard-subtitle');
const authorName = document.getElementById('author-name');
const postcardAuthorName = document.getElementById('postcard-author-name');
const date = document.getElementById('date');
const datePreview = document.getElementById('date-preview');
const contentText = document.querySelector('.admin-content__input');
const imgData = {
    AuthorPhoto: '',
    PostPhoto: '',
    ArticlePhoto: '',
};

const showTitlePreview = function() {
	if (postTitle.value) {
        articleTitle.innerHTML = postTitle.value;
        postcardTitle.innerHTML = postTitle.value;
	} else {
        articleTitle.innerHTML = 'New Post';
        postcardTitle.innerHTML = 'New Post';
  	}
}

const showSubtitlePreview = function() {
    if (postSubtitle.value) {
        articleSubitle.innerHTML = postSubtitle.value;
        postcardSubitle.innerHTML = postSubtitle.value;
    } else {
        articleSubitle.innerHTML = 'Please, enter any description';
        postcardSubitle.innerHTML = 'Please, enter any description';
    }
}

const showAuthorNamePreview = function() {
    if (authorName.value) {
        postcardAuthorName.innerHTML = authorName.value;
    } else {
        postcardAuthorName.innerHTML = 'Enter author name';
    }
}

const showDatePreview = function() {
    if (date.value) {
        datePreview.innerHTML = date.value;
    } else {
        datePreview.innerHTML = 'yyyy-mm-dd';
    }
}

postTitle.addEventListener('input', showTitlePreview);
postSubtitle.addEventListener('input', showSubtitlePreview);
authorName.addEventListener('input', showAuthorNamePreview);
date.addEventListener('input', showDatePreview);

//constants and functions for author photo input
const previewAuthorPhotoDiv = document.querySelector('.upload-part__profile-photo');
const inputAuthorPhoto = document.getElementById('author-photo');
const previewAuthorPhoto = document.querySelector('.upload-part__profile-photo-placeholder');
const uploadAuthorPhotoButton = document.getElementById('upload-author-photo');
const newOrRemoveAuthorPhoto = document.getElementById('new-remove-author-photo');
const removeAuthorPhotoButton = document.getElementById('remove-author-photo');
const postcardPreviewAuthorPhotoDiv = document.querySelector('.postcard-preview__author-pic');
const postcardPreviewAuthorPhoto = document.querySelector('.postcard-preview__author-pic-placeholder');

const uploadAuthorPhoto = async function() {
    const file = inputAuthorPhoto.files[0];
    const reader = new FileReader();

    reader.addEventListener(
        "load",
        function() {
            previewAuthorPhotoDiv.classList.add('hidden');
            postcardPreviewAuthorPhotoDiv.classList.add('hidden');
            previewAuthorPhoto.src = reader.result;
            postcardPreviewAuthorPhoto.src = reader.result;
            previewAuthorPhoto.classList.remove('hidden');
            postcardPreviewAuthorPhoto.classList.remove('hidden');
            uploadAuthorPhotoButton.classList.add('hidden');
            newOrRemoveAuthorPhoto.classList.add('flex');
        },
        false
    );

    if (file) {
        reader.readAsDataURL(file);
        await new Promise(resolve => reader.onload = () => resolve());
        imgData.AuthorPhoto = reader.result;
    }
}

const removeAuthorPhoto = function() {
    newOrRemoveAuthorPhoto.classList.remove('flex');
    uploadAuthorPhotoButton.classList.remove('hidden');
    previewAuthorPhoto.classList.add('hidden');
    postcardPreviewAuthorPhoto.classList.add('hidden');
    inputAuthorPhoto.value = '';
    previewAuthorPhoto.src = "";
    postcardPreviewAuthorPhoto.src = "";
    previewAuthorPhotoDiv.classList.remove('hidden');
    postcardPreviewAuthorPhotoDiv.classList.remove('hidden');
    imgData.AuthorPhoto = '';
}

inputAuthorPhoto.addEventListener('change', uploadAuthorPhoto);
removeAuthorPhotoButton.addEventListener('click', removeAuthorPhoto);

//constants and functions for big photo input
const inputBigPhoto = document.getElementById('big-photo');
const previewBigPhotoDiv = document.querySelector('.upload-part__upload-photo_big');
const previewBigPhoto = document.querySelector('.upload-part__upload-photo_big-placeholder');
const bigPhotoHint = document.getElementById('big-photo-hint');
const newOrRemoveBigPhoto = document.getElementById('new-remove-big-photo');
const articlePreviewPhotoDiv = document.querySelector('.article-preview__photo');
const articlePreviewPhoto = document.querySelector('.article-preview__photo-placeholder');
const removeBigPhotoButton = document.getElementById('remove-big-photo');

const uploadBigPhoto = async function() {
    const file = inputBigPhoto.files[0];
    const reader = new FileReader();

    reader.addEventListener(
        "load",
        function() {
            previewBigPhotoDiv.classList.remove('flex');
            previewBigPhoto.classList.remove('hidden');
            previewBigPhoto.src = reader.result;
            bigPhotoHint.classList.add('hidden');
            newOrRemoveBigPhoto.classList.add('flex');
            articlePreviewPhotoDiv.classList.add('hidden');
            articlePreviewPhoto.classList.remove('hidden');
            articlePreviewPhoto.src = reader.result;
        },
        false
    );

    if (file) {
        reader.readAsDataURL(file);
        await new Promise(resolve => reader.onload = () => resolve());
        imgData.ArticlePhoto = reader.result;
    }
}

const removeBigPhoto = function() {
    articlePreviewPhoto.src = "";
    articlePreviewPhoto.classList.add('hidden');
    articlePreviewPhotoDiv.classList.remove('hidden');
    newOrRemoveBigPhoto.classList.remove('flex');
    bigPhotoHint.classList.remove('hidden');
    previewBigPhoto.src = "";
    inputBigPhoto.value = '';
    previewBigPhoto.classList.add('hidden');
    previewBigPhotoDiv.classList.add('flex');
    imgData.ArticlePhoto = '';
}

inputBigPhoto.addEventListener('change', uploadBigPhoto);
removeBigPhotoButton.addEventListener('click', removeBigPhoto);

//constants and functions for small photo input
const inputSmallPhoto = document.getElementById('small-photo');
const previewSmallPhotoDiv = document.querySelector('.upload-part__upload-photo_small');
const previewSmallPhoto = document.querySelector('.upload-part__upload-photo_small-placeholder');
const smallPhotoHint = document.getElementById('small-photo-hint');
const newOrRemoveSmallPhoto = document.getElementById('new-remove-small-photo');
const postcardPreviewPhotoDiv = document.querySelector('.postcard-preview__photo');
const postcardPreviewPhoto = document.querySelector('.postcard-preview__photo-placeholder');
const removeSmallPhotoButton = document.getElementById('remove-small-photo');

const uploadSmallPhoto = async function() {
    const file = inputSmallPhoto.files[0];
    const reader = new FileReader();

    reader.addEventListener(
        "load",
        function() {
            previewSmallPhotoDiv.classList.remove('flex');
            previewSmallPhoto.classList.remove('hidden');
            previewSmallPhoto.src = reader.result;
            smallPhotoHint.classList.add('hidden');
            newOrRemoveSmallPhoto.classList.add('flex');
            postcardPreviewPhotoDiv.classList.add('hidden');
            postcardPreviewPhoto.classList.remove('hidden');
            postcardPreviewPhoto.src = reader.result;
        },
        false
    );

    if (file) {
        reader.readAsDataURL(file);
        await new Promise(resolve => reader.onload = () => resolve());
        imgData.PostPhoto = reader.result;
    }
}

const removeSmallPhoto = function() {
    postcardPreviewPhoto.src = "";
    postcardPreviewPhoto.classList.add('hidden');
    postcardPreviewPhotoDiv.classList.remove('hidden');
    newOrRemoveSmallPhoto.classList.remove('flex');
    smallPhotoHint.classList.remove('hidden');
    previewSmallPhoto.src = "";
    inputSmallPhoto.value = '';
    previewSmallPhoto.classList.add('hidden');
    previewSmallPhotoDiv.classList.add('flex');
    imgData.PostPhoto = '';
}

inputSmallPhoto.addEventListener('change', uploadSmallPhoto);
removeSmallPhotoButton.addEventListener('click', removeSmallPhoto);

//publish new post
const publishButton = document.getElementById('publish');

const publishNewPost = function() {
    if (!postTitle.value || !postSubtitle.value || !authorName.value) {
        console.log("Error");
    } else {
        console.log(JSON.stringify({
            PostTitle: postTitle.value,
            PostSubtitle: postSubtitle.value,
            AuthorName: authorName.value,
            Date: date.value,
            Content: contentText.value,
            AuthorPhoto: imgData.AuthorPhoto,
            PostPhoto: imgData.PostPhoto,
            ArticlePhoto: imgData.ArticlePhoto,
        }));
    }
}

publishButton.addEventListener('click', publishNewPost);