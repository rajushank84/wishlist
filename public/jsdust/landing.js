(function(){dust.register("public/templates/landing.dust",body_0);function body_0(chk,ctx){return chk.write("<section id=\"landing\"><div id=\"new\"><form id=\"addNew\" action=\"/doAddItem\" method=\"POST\"><input type=\"text\" placeholder=\"Add new item...\" id=\"newItemName\" name=\"name\" /><input type=\"submit\" value=\"+\" /></form></div><ul id=\"items\">").section(ctx.getPath(false,["data","items"]),ctx,{"block":body_1},null).write("</ul></section>");}function body_1(chk,ctx){return chk.write("<li class=\"item\"><form method=\"POST\" action=\"/doDeleteItem\"><span class=\"name\">").reference(ctx.get("name"),ctx,"h").write("</span><input type=\"hidden\" name=\"name\" value=\"").reference(ctx.get("name"),ctx,"h").write("\" /><span class=\"del\">&#10005;</span></form></li>");}return body_0;})();