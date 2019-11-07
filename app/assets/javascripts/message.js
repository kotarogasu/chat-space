$(function(){
  function buildMessage(message){
    image = (message.image) ? `<img class= "lower-message__image" src=${message.image} >` : "";
    // nilが入らないようにimageが無い場合の定義をしている
    var html = `<div class="message-view" data-id="${message.id}" >
                  <div class="message__uper-info">
                    ${message.user_name}
                  </div>
                  <div class="message__uper-info__date">
                    ${message.date}
                  </div>
                  <div class="lower-message">
                    <p class="lower-message__content">
                      ${message.content}
                    <p class 'lower-message__image'>
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

  var reloadMessages = function() {
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
      //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
      last_message_id = $('.message-view:last').data("id"); 
      $.ajax({
        //ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
        url: 'api/messages',
        //ルーティングで設定した通りhttpメソッドをgetに指定
        type: 'get',
        dataType: 'json',
        //dataオプションでリクエストに値を含める
        data: {id: last_message_id}
      })
      .done(function(messages) {
        //追加するHTMLの入れ物を作る
        console.log(messages)
        var insertHTML = '';
        //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
        messages.forEach(function (message) {
        //メッセージが入ったHTMLを取得
          insertHTML = buildMessage(message); 
        //メッセージを追加
          $('.messages').append(insertHTML);
        })
        $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
      })
      .fail(function() {
        alert('自動更新に失敗しました');
      });
    }
  };
  setInterval(reloadMessages, 5000); 
})