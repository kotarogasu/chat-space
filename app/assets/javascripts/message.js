$(function(){
  function buildMessage(message){
    var image = message.image ? `<p class='lower-message__image'><img src="${message.image}"></p>` : '';
    var html = `<div class="message-view">
                  <div class="message__uper-info">
                    ${message.user_name}
                  </div>
                  <div class="message__uper-info__date">
                    ${message.date}
                  </div>
                  <div class="lower-message">
                    <p class="lower-message__content">
                      ${message.content}
                      ${image}
                    </p>
                  </div>
                </div>`;
    return html ;
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false,
    })
    .done(function(data){
      var html = buildMessage(data);
      $('.messages').append(html);
      $('.messages').animate({scrollTop :$('.messages')[0].scrollHeight});
      $('.submit-btn').prop("disabled", false);
      $('.new_message')[0].reset();
    })
    .fail(function(){
      alert('自動更新に失敗しました');
    });
  })
})