/*
 * ------------------------------------------
 * JST模板二次封装文件
 * @version  1.0
 * @author   genify(caijf@corp.netease.com)
 * ------------------------------------------
 */
var f = function(){
    // variable declaration
    var _  = NEJ.P,
        _e = _('nej.e'),
        _u = _('nej.u');
    // interface
    /**
     * 取模板随机数种子<br />
     * 脚本举例
     * [code]
     *   var _e = NEJ.P('nej.e');
     *   // 返回一个当前日期
     *   var _seed = _e._$getHtmlTemplateSeed();
     * [/code]
     * @api    {nej.e._$getHtmlTemplateSeed}
     * @return {String} 随机数种子
     */
    _e._$getHtmlTemplateSeed = TrimPath.seed;
    /**
     * 根据模板的序列号合并模板数据<br />
     * 脚本举例
     * [code]
     *   var _e = NEJ.P('nej.e');
     *   var _html_seed =  _e._$addHtmlTemplate('<div>${name}</div>');
     *   // 生成结构<div>jack</div>
     *   _e._$getHtmlTemplate(_html_seed,{name:'jack'});
     * [/code]
     * @api    {nej.e._$getHtmlTemplate}
     * @see    {#._$addHtmlTemplate}
     * @param  {String} 模板序列号
     * @param  {Object} 模板数据
     * @param  {Object} 扩展接口
     * @return {String} 合并数据后的内容
     */
    _e._$getHtmlTemplate = function(_sn,_data,_extend){
        _extend = _extend||{};
        _extend.rand = _u._$randNumberString;
        _extend.format = _u._$format;
        _extend.escape = _u._$escape;
        return TrimPath.merge(_sn,_data,_extend);
    };
    /**
     * 添加JST模板，JST模板可以是节点的值<br />
     * 脚本举例
     * [code]
     *   var _e = NEJ.P('nej.e');
     *   var _html_seed =  _e._$addHtmlTemplate('<div>${name}</div>');
     * [/code]
     * @api    {nej.e._$addHtmlTemplate}
     * @see    {#._$getHtmlTemplate}
     * @param  {String}  JST模板内容或者节点ID
     * @param  {Boolean} 是否保留节点
     * @return {String}  JST模板在缓存中的序列号
     */
    _e._$addHtmlTemplate = function(_content,_keep){
        if (!_content) return '';
        var _sn,_element = _e._$get(_content);
        if (!!_element){
            _sn = _element.id;
            _content = _element.value||_element.innerText;
            if (!_keep) _e._$remove(_element);
        }
        return TrimPath.parse(_content,_sn);
    };
    /**
     * 整合模板后输出至指定容器节点<br />
     * 页面脚本举例
     * [code type="html"]
     *   <div id="box">aaa</div>
     * [/code]
     * 脚本举例
     * [code]
     *   var _e = NEJ.P('nej.e');
     *   var _html_seed =  _e._$addHtmlTemplate('<div>${name}</div>');
     *   // 把结构塞到box中，生成<div id="box"><div>jack</div></div>
     *   _e._$renderHtmlTemplate('box',_seed_html,{name:'jack'});
     * [/code]
     * @api    {nej.e._$renderHtmlTemplate}
     * @param  {String|Node} 容器节点
     * @param  {String}      模板序列号
     * @param  {Object}      模板数据
     * @param  {Object}      扩展接口
     * @return {nej.e}
     */
    _e._$renderHtmlTemplate = function(_parent,_sn,_data,_extend){
        _parent = _e._$get(_parent);
        if (!!_parent)
            _parent.innerHTML = 
                _e._$getHtmlTemplate(_sn,_data,_extend);
        return this;
    };
};
NEJ.define('{lib}util/template/jst.js',
          ['{lib}base/util.js'
          ,'{lib}base/element.js'
          ,'{lib}util/template/trimpath.nej.js'],f);