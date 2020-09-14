import request from '@/utils/request'

export function tagList(data) {
  return request({
    url: 'blog/tag/list',
    method: 'GET',
    params: data
  })
}

export function deleteTag(data) {
  return request({
    url: 'blog/tag/delete',
    method: 'GET',
    params: data
  })
}

export function addAndUpdateTag(data) {
  return request({
    url: 'blog/tag/add',
    method: 'post',
    data
  })
}
