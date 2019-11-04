class Group < ApplicationRecord
  has_many :group_users
  has_many :users, through: :group_users
  has_many :messages
  validates :name, presence: true, uniqueness: true
  
  def show_last_message
    if (last_message = messages.last).present?
      last_message.content? ? last_message.content : '画像が投稿されています'
    else
      'まだメッセージはありません。'
    end
  end 
end
  
  # 5行目で、「if (last_message = messages.last).present?」と記述することで、
  # 最新のメッセージを変数last_messageに代入しつつ、メッセージが投稿されているか
  # どうかで場合分けを行なっています。
  # 6行目の記述は三項演算子と呼ばれるもので
  # 条件式 ? trueの時の値 : falseの時の値という書き方

