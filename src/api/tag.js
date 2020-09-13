import request from '@/utils/request'

export function tgaList(data) {
  return request({
    url: 'blog/tag/list',
    methods: 'GET',
    params: data
  })
}

export function deleteTag(data) {
  return request({
    url: 'blog/tag/delete',
    methods: 'GET',
    params: data
  })
}
