import{_ as s,c as i,o as e,a4 as a}from"./chunks/framework.B7YSrJ1r.js";const g=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"Learning/System Design/indexing.md","filePath":"Learning/System Design/indexing.md","lastUpdated":1726928955000}'),n={name:"Learning/System Design/indexing.md"},t=a(`<h3 id="sql-indexing" tabindex="-1">SQL Indexing <a class="header-anchor" href="#sql-indexing" aria-label="Permalink to &quot;SQL Indexing&quot;">​</a></h3><p>In SQL databases (like MySQL, PostgreSQL), indexing works by creating a data structure (usually a B-tree or hash table) to allow for faster retrieval of records. When you search or query a large dataset, an index helps the database find the required rows more quickly, similar to a book&#39;s index.</p><p><strong>Example:</strong></p><p>Let&#39;s say you have a table <code>Employees</code>:</p><table tabindex="0"><thead><tr><th>EmployeeID</th><th>Name</th><th>Age</th><th>Salary</th></tr></thead><tbody><tr><td>1</td><td>John</td><td>30</td><td>50000</td></tr><tr><td>2</td><td>Alice</td><td>25</td><td>60000</td></tr><tr><td>3</td><td>Bob</td><td>35</td><td>55000</td></tr></tbody></table><p>Without an index on the <code>Name</code> column, the database would need to scan every row to find a record matching a name like &quot;Alice.&quot;</p><p>You can create an index on <code>Name</code>:</p><div class="language-sql vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">CREATE</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> INDEX</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> idx_name</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> ON</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Employees(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">Name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>Now, when you query:</p><div class="language-sql vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">SELECT</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> *</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> FROM</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Employees </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">WHERE</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> Name</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;Alice&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>The database will use the index to directly go to the row, avoiding a full table scan, resulting in faster queries.</p><h3 id="nosql-indexing" tabindex="-1">NoSQL Indexing <a class="header-anchor" href="#nosql-indexing" aria-label="Permalink to &quot;NoSQL Indexing&quot;">​</a></h3><p>In NoSQL databases (like MongoDB), indexing is also used for faster querying. NoSQL databases are often designed for unstructured or semi-structured data, and their indexing can be more flexible.</p><p><strong>Example:</strong></p><p>Imagine a MongoDB collection <code>students</code>:</p><div class="language-json vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">   &quot;_id&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#B31D28;--shiki-dark:#FDAEB7;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">ObjectId(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;123&quot;</span><span style="--shiki-light:#B31D28;--shiki-dark:#FDAEB7;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">)</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">   &quot;name&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;John&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">   &quot;age&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">30</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">   &quot;courses&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Math&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Science&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>You can create an index on the <code>name</code> field:</p><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">db.students.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">createIndex</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({ name: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> });</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>Here, <code>1</code> means ascending order. When you search for a student by <code>name</code>:</p><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">db.students.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">find</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({ name: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;John&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> });</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>MongoDB will use the index to find the document much faster compared to searching through each document.</p><h3 id="key-differences" tabindex="-1">Key Differences <a class="header-anchor" href="#key-differences" aria-label="Permalink to &quot;Key Differences&quot;">​</a></h3><ul><li><strong>SQL</strong>: Relational, uses B-tree indexes.</li><li><strong>NoSQL</strong>: Document-based, uses indexes specific to document structures like JSON. Some use B-tree, others use different structures based on the database system.</li></ul><p>Both types improve performance by avoiding full scans and making data retrieval more efficient.</p>`,24),l=[t];function d(h,r,p,o,k,c){return e(),i("div",null,l)}const E=s(n,[["render",d]]);export{g as __pageData,E as default};