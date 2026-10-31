window.DIAGRAMS = {
  // 1. 线程池执行流程
  "j-c1": `
    <svg viewBox="0 0 760 320" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:760px;height:auto;display:block;margin:0 auto;">
      <defs>
        <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1 L 10 5 L 0 9 z" fill="var(--text3)"/>
        </marker>
        <marker id="arrow-blue" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1 L 10 5 L 0 9 z" fill="var(--accent)"/>
        </marker>
        <marker id="arrow-red" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1 L 10 5 L 0 9 z" fill="var(--danger)"/>
        </marker>
      </defs>
      
      <rect x="20" y="35" width="100" height="46" rx="8" fill="var(--bg-elev-2)" stroke="var(--border)" stroke-width="1.5"/>
      <text x="70" y="63" text-anchor="middle" font-size="13" font-weight="600" fill="var(--text)">任务提交</text>

      <line x1="120" y1="58" x2="160" y2="58" stroke="var(--text3)" stroke-width="1.5" marker-end="url(#arrow)"/>
      <rect x="160" y="30" width="130" height="56" rx="8" fill="var(--accent-soft)" stroke="var(--accent)" stroke-width="1.5"/>
      <text x="225" y="53" text-anchor="middle" font-size="12" font-weight="600" fill="var(--accent)">线程数 &lt; corePool?</text>
      <text x="225" y="72" text-anchor="middle" font-size="11" fill="var(--text2)">核心线程未满</text>

      <line x1="225" y1="86" x2="225" y2="135" stroke="var(--success)" stroke-width="1.5" marker-end="url(#arrow)"/>
      <text x="233" y="112" font-size="11" font-weight="600" fill="var(--success)">是</text>
      <rect x="160" y="135" width="130" height="46" rx="8" fill="var(--success-soft)" stroke="var(--success)" stroke-width="1.5"/>
      <text x="225" y="163" text-anchor="middle" font-size="12" font-weight="600" fill="var(--success-text)">创建核心线程执行</text>

      <line x1="290" y1="58" x2="350" y2="58" stroke="var(--text3)" stroke-width="1.5" marker-end="url(#arrow)"/>
      <text x="315" y="50" text-anchor="middle" font-size="11" font-weight="600" fill="var(--danger)">否</text>
      <rect x="350" y="30" width="130" height="56" rx="8" fill="var(--accent-soft)" stroke="var(--accent)" stroke-width="1.5"/>
      <text x="415" y="53" text-anchor="middle" font-size="12" font-weight="600" fill="var(--accent)">阻塞队列 workQueue?</text>
      <text x="415" y="72" text-anchor="middle" font-size="11" fill="var(--text2)">能否入队成功</text>

      <line x1="415" y1="86" x2="415" y2="135" stroke="var(--success)" stroke-width="1.5" marker-end="url(#arrow)"/>
      <text x="423" y="112" font-size="11" font-weight="600" fill="var(--success)">是</text>
      <rect x="350" y="135" width="130" height="46" rx="8" fill="var(--success-soft)" stroke="var(--success)" stroke-width="1.5"/>
      <text x="415" y="163" text-anchor="middle" font-size="12" font-weight="600" fill="var(--success-text)">进入等待队列</text>

      <line x1="480" y1="58" x2="540" y2="58" stroke="var(--text3)" stroke-width="1.5" marker-end="url(#arrow)"/>
      <text x="505" y="50" text-anchor="middle" font-size="11" font-weight="600" fill="var(--danger)">队列已满</text>
      <rect x="540" y="30" width="140" height="56" rx="8" fill="var(--accent-soft)" stroke="var(--accent)" stroke-width="1.5"/>
      <text x="610" y="53" text-anchor="middle" font-size="12" font-weight="600" fill="var(--accent)">线程数 &lt; maximum?</text>
      <text x="610" y="72" text-anchor="middle" font-size="11" fill="var(--text2)">最大线程未满</text>

      <line x1="610" y1="86" x2="610" y2="135" stroke="var(--success)" stroke-width="1.5" marker-end="url(#arrow)"/>
      <text x="618" y="112" font-size="11" font-weight="600" fill="var(--success)">是</text>
      <rect x="540" y="135" width="140" height="46" rx="8" fill="var(--success-soft)" stroke="var(--success)" stroke-width="1.5"/>
      <text x="610" y="163" text-anchor="middle" font-size="12" font-weight="600" fill="var(--success-text)">创建非核心线程执行</text>

      <line x1="610" y1="181" x2="610" y2="230" stroke="var(--danger)" stroke-width="1.5" marker-end="url(#arrow-red)"/>
      <text x="618" y="210" font-size="11" font-weight="600" fill="var(--danger)">仍满 (溢出)</text>
      <rect x="510" y="230" width="200" height="66" rx="8" fill="var(--danger-soft)" stroke="var(--danger)" stroke-width="1.5"/>
      <text x="610" y="253" text-anchor="middle" font-size="12" font-weight="600" fill="var(--danger-text)">执行拒绝策略 (Handler)</text>
      <text x="610" y="272" text-anchor="middle" font-size="11" fill="var(--danger-text)">Abort / CallerRuns / Discard</text>
      <text x="610" y="287" text-anchor="middle" font-size="10" fill="var(--text2)">（CallerRuns 可让调用线程天然降速）</text>
    </svg>
  `,

  // 2. synchronized 锁升级与 Mark Word
  "j-c2": `
    <svg viewBox="0 0 740 160" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:740px;height:auto;display:block;margin:0 auto;">
      <defs>
        <marker id="lk-arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1 L 10 5 L 0 9 z" fill="var(--accent)"/>
        </marker>
      </defs>

      <!-- 1. 无锁 -->
      <rect x="20" y="35" width="150" height="90" rx="8" fill="var(--bg-elev-2)" stroke="var(--border)" stroke-width="1.5"/>
      <text x="95" y="65" text-anchor="middle" font-size="13" font-weight="700" fill="var(--text)">无锁状态 (001)</text>
      <text x="95" y="85" text-anchor="middle" font-size="11" fill="var(--text2)">对象的初始状态</text>
      <text x="95" y="105" text-anchor="middle" font-size="10.5" fill="var(--text3)">对象头存 HashCode / 年龄</text>

      <line x1="170" y1="80" x2="200" y2="80" stroke="var(--accent)" stroke-width="2" marker-end="url(#lk-arrow)"/>

      <!-- 2. 偏向锁 -->
      <rect x="200" y="35" width="155" height="90" rx="8" fill="var(--accent-soft)" stroke="var(--accent)" stroke-width="1.5"/>
      <text x="277" y="65" text-anchor="middle" font-size="13" font-weight="700" fill="var(--accent)">偏向锁 (101)</text>
      <text x="277" y="85" text-anchor="middle" font-size="11" fill="var(--accent)">单线程重复访问</text>
      <text x="277" y="105" text-anchor="middle" font-size="10.5" fill="var(--text2)">Mark Word 记录线程 Thread ID</text>

      <line x1="355" y1="80" x2="385" y2="80" stroke="var(--accent)" stroke-width="2" marker-end="url(#lk-arrow)"/>

      <!-- 3. 轻量级锁 -->
      <rect x="385" y="35" width="155" height="90" rx="8" fill="var(--warn-soft)" stroke="var(--warn)" stroke-width="1.5"/>
      <text x="462" y="65" text-anchor="middle" font-size="13" font-weight="700" fill="var(--warn-text)">轻量级锁 (00)</text>
      <text x="462" y="85" text-anchor="middle" font-size="11" fill="var(--warn-text)">多个线程轻度竞争</text>
      <text x="462" y="105" text-anchor="middle" font-size="10.5" fill="var(--text2)">CAS 自旋 (BasicObjectLock)</text>

      <line x1="540" y1="80" x2="570" y2="80" stroke="var(--accent)" stroke-width="2" marker-end="url(#lk-arrow)"/>

      <!-- 4. 重量级锁 -->
      <rect x="570" y="35" width="150" height="90" rx="8" fill="var(--danger-soft)" stroke="var(--danger)" stroke-width="1.5"/>
      <text x="645" y="65" text-anchor="middle" font-size="13" font-weight="700" fill="var(--danger-text)">重量级锁 (10)</text>
      <text x="645" y="85" text-anchor="middle" font-size="11" fill="var(--danger-text)">自旋失败 / 重度竞争</text>
      <text x="645" y="105" text-anchor="middle" font-size="10.5" fill="var(--danger-text)">ObjectMonitor 挂起阻塞</text>
    </svg>
  `,

  // 3. AQS 原理与队列结构
  "j-c3": `
    <svg viewBox="0 0 740 220" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:740px;height:auto;display:block;margin:0 auto;">
      <defs>
        <marker id="aqs-arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1 L 10 5 L 0 9 z" fill="var(--accent)"/>
        </marker>
      </defs>

      <!-- State Box -->
      <rect x="250" y="20" width="240" height="42" rx="8" fill="var(--accent-soft)" stroke="var(--accent)" stroke-width="1.5"/>
      <text x="370" y="46" text-anchor="middle" font-size="13" font-weight="700" fill="var(--accent)">volatile int state (资源计数器)</text>

      <line x1="370" y1="62" x2="370" y2="85" stroke="var(--accent)" stroke-width="1.5" marker-end="url(#aqs-arrow)"/>

      <!-- CLH Queue Box -->
      <rect x="30" y="85" width="680" height="110" rx="10" fill="var(--bg-elev-2)" stroke="var(--border)" stroke-width="1.5"/>
      <text x="50" y="108" font-size="12" font-weight="700" fill="var(--text2)">CLH 同步队列 (双向链表 FIFO)</text>

      <!-- Head Node (Dummy) -->
      <rect x="50" y="120" width="115" height="58" rx="6" fill="var(--bg-elev)" stroke="var(--border)" stroke-width="1.2"/>
      <text x="107" y="145" text-anchor="middle" font-size="11.5" font-weight="600" fill="var(--text)">Head (哨兵)</text>
      <text x="107" y="162" text-anchor="middle" font-size="10" fill="var(--text3)">持有锁的线程</text>

      <line x1="165" y1="145" x2="205" y2="145" stroke="var(--accent)" stroke-width="1.5" marker-end="url(#aqs-arrow)"/>
      <line x1="205" y1="155" x2="165" y2="155" stroke="var(--text3)" stroke-width="1.5" marker-end="url(#aqs-arrow)"/>

      <!-- Node 1 -->
      <rect x="205" y="120" width="130" height="58" rx="6" fill="var(--bg-elev)" stroke="var(--border)" stroke-width="1.2"/>
      <text x="270" y="145" text-anchor="middle" font-size="11.5" font-weight="600" fill="var(--text)">Node (Thread A)</text>
      <text x="270" y="162" text-anchor="middle" font-size="10" fill="var(--warn-text)">waitStatus: SIGNAL</text>

      <line x1="335" y1="145" x2="375" y2="145" stroke="var(--accent)" stroke-width="1.5" marker-end="url(#aqs-arrow)"/>
      <line x1="375" y1="155" x2="335" y2="155" stroke="var(--text3)" stroke-width="1.5" marker-end="url(#aqs-arrow)"/>

      <!-- Node 2 -->
      <rect x="375" y="120" width="130" height="58" rx="6" fill="var(--bg-elev)" stroke="var(--border)" stroke-width="1.2"/>
      <text x="440" y="145" text-anchor="middle" font-size="11.5" font-weight="600" fill="var(--text)">Node (Thread B)</text>
      <text x="440" y="162" text-anchor="middle" font-size="10" fill="var(--danger-text)">LockSupport.park()</text>

      <line x1="505" y1="145" x2="545" y2="145" stroke="var(--accent)" stroke-width="1.5" marker-end="url(#aqs-arrow)"/>
      <line x1="545" y1="155" x2="505" y2="155" stroke="var(--text3)" stroke-width="1.5" marker-end="url(#aqs-arrow)"/>

      <!-- Tail Node -->
      <rect x="545" y="120" width="115" height="58" rx="6" fill="var(--bg-elev)" stroke="var(--border)" stroke-width="1.2"/>
      <text x="602" y="145" text-anchor="middle" font-size="11.5" font-weight="600" fill="var(--text)">Tail (队尾)</text>
      <text x="602" y="162" text-anchor="middle" font-size="10" fill="var(--text3)">CAS 尾插入队</text>
    </svg>
  `,

  // 4. HashMap 1.8 数组 + 链表 + 红黑树
  "j-col1": `
    <svg viewBox="0 0 740 240" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:740px;height:auto;display:block;margin:0 auto;">
      <defs>
        <marker id="hm-arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1 L 10 5 L 0 9 z" fill="var(--accent)"/>
        </marker>
      </defs>

      <!-- Table Array -->
      <rect x="30" y="30" width="140" height="180" rx="8" fill="var(--bg-elev-2)" stroke="var(--border)" stroke-width="1.5"/>
      <text x="100" y="52" text-anchor="middle" font-size="12" font-weight="700" fill="var(--text)">Node[] table</text>

      <rect x="45" y="65" width="110" height="28" rx="4" fill="var(--bg-elev)" stroke="var(--border)" stroke-width="1"/>
      <text x="100" y="84" text-anchor="middle" font-size="11" fill="var(--text2)">table[0] (空)</text>

      <rect x="45" y="100" width="110" height="28" rx="4" fill="var(--accent-soft)" stroke="var(--accent)" stroke-width="1"/>
      <text x="100" y="119" text-anchor="middle" font-size="11" font-weight="600" fill="var(--accent)">table[1] (链表)</text>

      <rect x="45" y="135" width="110" height="28" rx="4" fill="var(--bg-elev)" stroke="var(--border)" stroke-width="1"/>
      <text x="100" y="154" text-anchor="middle" font-size="11" fill="var(--text2)">table[2] (空)</text>

      <rect x="45" y="170" width="110" height="28" rx="4" fill="var(--danger-soft)" stroke="var(--danger)" stroke-width="1"/>
      <text x="100" y="189" text-anchor="middle" font-size="11" font-weight="600" fill="var(--danger-text)">table[3] (红黑树)</text>

      <!-- Linked List Part -->
      <line x1="155" y1="114" x2="200" y2="114" stroke="var(--accent)" stroke-width="1.5" marker-end="url(#hm-arrow)"/>
      <rect x="200" y="98" width="90" height="32" rx="5" fill="var(--bg-elev)" stroke="var(--border)" stroke-width="1"/>
      <text x="245" y="118" text-anchor="middle" font-size="11" fill="var(--text)">Node (k1, v1)</text>

      <line x1="290" y1="114" x2="330" y2="114" stroke="var(--accent)" stroke-width="1.5" marker-end="url(#hm-arrow)"/>
      <rect x="330" y="98" width="90" height="32" rx="5" fill="var(--bg-elev)" stroke="var(--border)" stroke-width="1"/>
      <text x="375" y="118" text-anchor="middle" font-size="11" fill="var(--text)">Node (k2, v2)</text>

      <text x="440" y="118" font-size="11" fill="var(--text3)">... (链表长度 &lt; 8)</text>

      <!-- Tree Part -->
      <line x1="155" y1="184" x2="230" y2="184" stroke="var(--danger)" stroke-width="1.5" marker-end="url(#hm-arrow)"/>
      <rect x="230" y="155" width="480" height="65" rx="8" fill="var(--danger-soft)" stroke="var(--danger)" stroke-width="1.2"/>
      <text x="245" y="180" font-size="12" font-weight="700" fill="var(--danger-text)">🌲 转换为红黑树 (TreeNode)</text>
      <text x="245" y="200" font-size="11" fill="var(--danger-text)">触发条件：链表长度 ≥ 8 且 数组总容量 table.length ≥ 64 (否则优先扩容 resize)</text>
      <text x="560" y="180" font-size="11" fill="var(--text2)">退化阈值：节点数 ≤ 6</text>
    </svg>
  `,

  // 5. GC 分代回收模型
  "j-v2": `
    <svg viewBox="0 0 740 220" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:740px;height:auto;display:block;margin:0 auto;">
      <defs>
        <marker id="gc-arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1 L 10 5 L 0 9 z" fill="var(--accent)"/>
        </marker>
      </defs>

      <!-- Young Gen -->
      <rect x="20" y="25" width="410" height="165" rx="10" fill="var(--accent-soft)" stroke="var(--accent)" stroke-width="1.5"/>
      <text x="40" y="48" font-size="13" font-weight="700" fill="var(--accent)">新生代 (Young Generation) · Minor GC (复制算法)</text>

      <!-- Eden -->
      <rect x="35" y="65" width="220" height="85" rx="6" fill="var(--bg-elev)" stroke="var(--border)" stroke-width="1.2"/>
      <text x="145" y="95" text-anchor="middle" font-size="12" font-weight="600" fill="var(--text)">Eden 区 (80%)</text>
      <text x="145" y="115" text-anchor="middle" font-size="10.5" fill="var(--text3)">新对象分配首选地 (朝生夕灭)</text>

      <line x1="255" y1="105" x2="280" y2="105" stroke="var(--accent)" stroke-width="1.5" marker-end="url(#gc-arrow)"/>

      <!-- Survivor -->
      <rect x="280" y="65" width="60" height="85" rx="6" fill="var(--bg-elev)" stroke="var(--border)" stroke-width="1.2"/>
      <text x="310" y="105" text-anchor="middle" font-size="11.5" font-weight="600" fill="var(--text)">S0 (10%)</text>
      <text x="310" y="125" text-anchor="middle" font-size="9" fill="var(--text3)">From</text>

      <line x1="340" y1="105" x2="360" y2="105" stroke="var(--accent)" stroke-width="1.5" marker-end="url(#gc-arrow)"/>

      <rect x="360" y="65" width="60" height="85" rx="6" fill="var(--bg-elev)" stroke="var(--border)" stroke-width="1.2"/>
      <text x="390" y="105" text-anchor="middle" font-size="11.5" font-weight="600" fill="var(--text)">S1 (10%)</text>
      <text x="390" y="125" text-anchor="middle" font-size="9" fill="var(--text3)">To</text>

      <text x="40" y="172" font-size="10.5" fill="var(--text2)">Survivor 区分工轮换，每挺过一轮 GC 年龄 +1</text>

      <!-- Promotion Arrow -->
      <line x1="430" y1="105" x2="480" y2="105" stroke="var(--warn)" stroke-width="2" marker-end="url(#gc-arrow)"/>
      <text x="455" y="95" text-anchor="middle" font-size="10" font-weight="600" fill="var(--warn-text)">晋升 (≥15岁)</text>

      <!-- Old Gen -->
      <rect x="480" y="25" width="240" height="165" rx="10" fill="var(--warn-soft)" stroke="var(--warn)" stroke-width="1.5"/>
      <text x="500" y="48" font-size="13" font-weight="700" fill="var(--warn-text)">老年代 (Old Gen)</text>
      <rect x="495" y="65" width="210" height="85" rx="6" fill="var(--bg-elev)" stroke="var(--border)" stroke-width="1.2"/>
      <text x="600" y="95" text-anchor="middle" font-size="12" font-weight="600" fill="var(--text)">Tenured 区域</text>
      <text x="600" y="115" text-anchor="middle" font-size="10.5" fill="var(--text3)">大对象直接入老年代 / 存活期长</text>
      <text x="600" y="135" text-anchor="middle" font-size="10" font-weight="600" fill="var(--danger-text)">触发 Major / Full GC (标记-整理)</text>
    </svg>
  `,

  // 6. MySQL 聚簇索引与回表
  "j-m2": `
    <svg viewBox="0 0 740 230" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:740px;height:auto;display:block;margin:0 auto;">
      <defs>
        <marker id="sql-arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1 L 10 5 L 0 9 z" fill="var(--accent)"/>
        </marker>
        <marker id="sql-warn" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1 L 10 5 L 0 9 z" fill="var(--warn)"/>
        </marker>
      </defs>

      <!-- Query -->
      <rect x="20" y="20" width="310" height="42" rx="6" fill="var(--bg-elev-2)" stroke="var(--border)" stroke-width="1.5"/>
      <text x="35" y="46" font-family="var(--mono)" font-size="12" fill="var(--text)">SELECT * FROM user WHERE age = 18;</text>

      <!-- Secondary Index -->
      <rect x="20" y="85" width="310" height="120" rx="8" fill="var(--accent-soft)" stroke="var(--accent)" stroke-width="1.5"/>
      <text x="35" y="108" font-size="12" font-weight="700" fill="var(--accent)">二级索引 (非聚簇索引，如 idx_age)</text>
      <rect x="35" y="125" width="280" height="60" rx="5" fill="var(--bg-elev)" stroke="var(--border)" stroke-width="1"/>
      <text x="45" y="148" font-size="11.5" fill="var(--text)">叶子节点存储内容：<b>[age, 主键ID]</b></text>
      <text x="45" y="168" font-size="11" fill="var(--text3)">先在二级索引树查到 age=18 对应的主键 id=101</text>

      <!-- Return Arrow (回表) -->
      <path d="M 330 155 Q 400 130 430 150" fill="none" stroke="var(--warn)" stroke-width="2.5" marker-end="url(#sql-warn)"/>
      <text x="390" y="125" text-anchor="middle" font-size="11.5" font-weight="700" fill="var(--warn-text)">回表查询 (Look up)</text>
      <text x="390" y="142" text-anchor="middle" font-size="10" fill="var(--text3)">需完整行记录</text>

      <!-- Clustered Index -->
      <rect x="440" y="85" width="280" height="120" rx="8" fill="var(--success-soft)" stroke="var(--success)" stroke-width="1.5"/>
      <text x="455" y="108" font-size="12" font-weight="700" fill="var(--success-text)">聚簇索引 (主键索引 PRIMARY KEY)</text>
      <rect x="455" y="125" width="250" height="60" rx="5" fill="var(--bg-elev)" stroke="var(--border)" stroke-width="1"/>
      <text x="465" y="148" font-size="11.5" fill="var(--text)">根据主键 id=101 二次寻址</text>
      <text x="465" y="168" font-size="11" font-weight="600" fill="var(--success-text)">叶子节点存储完整行记录 (Row data)</text>

      <rect x="440" y="20" width="280" height="42" rx="6" fill="var(--success-soft)" stroke="var(--success)" stroke-width="1"/>
      <text x="455" y="45" font-size="11" font-weight="600" fill="var(--success-text)">💡 覆盖索引：若只查 id, age 则免回表！</text>
    </svg>
  `,

  // 7. MySQL MVCC ReadView 与版本链
  "j-m3": `
    <svg viewBox="0 0 740 220" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:740px;height:auto;display:block;margin:0 auto;">
      <defs>
        <marker id="mv-arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1 L 10 5 L 0 9 z" fill="var(--accent)"/>
        </marker>
      </defs>

      <!-- ReadView Box -->
      <rect x="20" y="20" width="700" height="65" rx="8" fill="var(--accent-soft)" stroke="var(--accent)" stroke-width="1.5"/>
      <text x="40" y="44" font-size="12.5" font-weight="700" fill="var(--accent)">ReadView (一致性读视图四元组)</text>
      <text x="40" y="65" font-size="11" fill="var(--text)">
        <b>m_ids</b>: 当前活跃未提交事务列表 | 
        <b>min_trx_id</b>: 活跃事务最小ID | 
        <b>max_trx_id</b>: 系统待分配下一个事务ID | 
        <b>creator_trx_id</b>: 本事务ID
      </text>

      <!-- Undo Log Chain -->
      <rect x="20" y="105" width="700" height="95" rx="8" fill="var(--bg-elev-2)" stroke="var(--border)" stroke-width="1.5"/>
      <text x="40" y="125" font-size="12" font-weight="700" fill="var(--text2)">Undo Log 多版本版本链 (通过 roll_pointer 指针倒序串联)</text>

      <!-- Version 3 (Latest) -->
      <rect x="40" y="140" width="180" height="46" rx="5" fill="var(--bg-elev)" stroke="var(--border)" stroke-width="1.2"/>
      <text x="50" y="160" font-size="11" font-weight="600" fill="var(--text)">版本 V3: name="Tom"</text>
      <text x="50" y="176" font-size="10" fill="var(--accent)">trx_id = 100 (最新)</text>

      <line x1="220" y1="163" x2="270" y2="163" stroke="var(--accent)" stroke-width="1.5" marker-end="url(#mv-arrow)"/>
      <text x="245" y="155" text-anchor="middle" font-size="9" fill="var(--text3)">roll_ptr</text>

      <!-- Version 2 -->
      <rect x="270" y="140" width="180" height="46" rx="5" fill="var(--bg-elev)" stroke="var(--border)" stroke-width="1.2"/>
      <text x="280" y="160" font-size="11" font-weight="600" fill="var(--text)">版本 V2: name="Jerry"</text>
      <text x="280" y="176" font-size="10" fill="var(--text2)">trx_id = 90</text>

      <line x1="450" y1="163" x2="500" y2="163" stroke="var(--accent)" stroke-width="1.5" marker-end="url(#mv-arrow)"/>
      <text x="475" y="155" text-anchor="middle" font-size="9" fill="var(--text3)">roll_ptr</text>

      <!-- Version 1 (Oldest) -->
      <rect x="500" y="140" width="180" height="46" rx="5" fill="var(--bg-elev)" stroke="var(--border)" stroke-width="1.2"/>
      <text x="510" y="160" font-size="11" font-weight="600" fill="var(--text)">版本 V1: name="Jack"</text>
      <text x="510" y="176" font-size="10" fill="var(--success-text)">trx_id = 80 (已提交)</text>
    </svg>
  `,

  // 8. Redis 缓存穿透 / 击穿 / 雪崩
  "j-r1": `
    <svg viewBox="0 0 740 230" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:740px;height:auto;display:block;margin:0 auto;">
      <!-- 穿透 -->
      <rect x="20" y="20" width="225" height="190" rx="8" fill="var(--bg-elev-2)" stroke="var(--border)" stroke-width="1.5"/>
      <rect x="20" y="20" width="225" height="36" rx="8 8 0 0" fill="var(--danger-soft)"/>
      <text x="132" y="44" text-anchor="middle" font-size="13" font-weight="700" fill="var(--danger-text)">1. 缓存穿透</text>
      <text x="35" y="76" font-size="11" font-weight="600" fill="var(--text)">现象：数据不存在</text>
      <text x="35" y="94" font-size="10.5" fill="var(--text2)">Redis 与 DB 均无数据，请求直穿 DB，高并发下击垮数据库。</text>
      <rect x="35" y="125" width="195" height="65" rx="5" fill="var(--bg-elev)" stroke="var(--border)" stroke-width="1"/>
      <text x="45" y="145" font-size="11" font-weight="600" fill="var(--success-text)">🛡️ 组合防御：</text>
      <text x="45" y="163" font-size="10" fill="var(--text2)">• 布隆过滤器前置拦截</text>
      <text x="45" y="178" font-size="10" fill="var(--text2)">• 缓存空对象 (短过期时间)</text>

      <!-- 击穿 -->
      <rect x="257" y="20" width="225" height="190" rx="8" fill="var(--bg-elev-2)" stroke="var(--border)" stroke-width="1.5"/>
      <rect x="257" y="20" width="225" height="36" rx="8 8 0 0" fill="var(--warn-soft)"/>
      <text x="369" y="44" text-anchor="middle" font-size="13" font-weight="700" fill="var(--warn-text)">2. 缓存击穿</text>
      <text x="272" y="76" font-size="11" font-weight="600" fill="var(--text)">现象：热点单一 Key 失效</text>
      <text x="272" y="94" font-size="10.5" fill="var(--text2)">单一极高频热点 Key 过期瞬间，海量请求同时压垮 DB。</text>
      <rect x="272" y="125" width="195" height="65" rx="5" fill="var(--bg-elev)" stroke="var(--border)" stroke-width="1"/>
      <text x="282" y="145" font-size="11" font-weight="600" fill="var(--success-text)">🛡️ 组合防御：</text>
      <text x="282" y="163" font-size="10" fill="var(--text2)">• 互斥锁 (Mutex Lock) 查库</text>
      <text x="282" y="178" font-size="10" fill="var(--text2)">• 热点数据逻辑永不过期</text>

      <!-- 雪崩 -->
      <rect x="495" y="20" width="225" height="190" rx="8" fill="var(--bg-elev-2)" stroke="var(--border)" stroke-width="1.5"/>
      <rect x="495" y="20" width="225" height="36" rx="8 8 0 0" fill="var(--accent-soft)"/>
      <text x="607" y="44" text-anchor="middle" font-size="13" font-weight="700" fill="var(--accent)">3. 缓存雪崩</text>
      <text x="510" y="76" font-size="11" font-weight="600" fill="var(--text)">现象：大量 Key 集中失效</text>
      <text x="510" y="94" font-size="10.5" fill="var(--text2)">同一时间大批 Key 到期或 Redis 实例整体宕机瘫痪。</text>
      <rect x="510" y="125" width="195" height="65" rx="5" fill="var(--bg-elev)" stroke="var(--border)" stroke-width="1"/>
      <text x="520" y="145" font-size="11" font-weight="600" fill="var(--success-text)">🛡️ 组合防御：</text>
      <text x="520" y="163" font-size="10" fill="var(--text2)">• 过期时间增加随机打散 (TTL+rand)</text>
      <text x="520" y="178" font-size="10" fill="var(--text2)">• Redis 哨兵/集群多机房高可用</text>
    </svg>
  `,

  // 9. Redis 分布式锁与 Redisson 看门狗
  "j-r3": `
    <svg viewBox="0 0 740 220" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:740px;height:auto;display:block;margin:0 auto;">
      <defs>
        <marker id="rd-arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1 L 10 5 L 0 9 z" fill="var(--accent)"/>
        </marker>
      </defs>

      <rect x="30" y="30" width="160" height="60" rx="8" fill="var(--bg-elev-2)" stroke="var(--border)" stroke-width="1.5"/>
      <text x="110" y="55" text-anchor="middle" font-size="12" font-weight="700" fill="var(--text)">业务线程 Client</text>
      <text x="110" y="72" text-anchor="middle" font-size="10.5" fill="var(--text3)">执行加锁 rLock.lock()</text>

      <line x1="190" y1="60" x2="260" y2="60" stroke="var(--accent)" stroke-width="2" marker-end="url(#rd-arrow)"/>
      <text x="225" y="50" text-anchor="middle" font-size="10.5" fill="var(--accent)">加锁请求</text>

      <!-- Redis Server -->
      <rect x="260" y="25" width="230" height="80" rx="8" fill="var(--danger-soft)" stroke="var(--danger)" stroke-width="1.5"/>
      <text x="375" y="50" text-anchor="middle" font-size="12.5" font-weight="700" fill="var(--danger-text)">Redis 实例 (原子 Lua)</text>
      <text x="375" y="70" text-anchor="middle" font-family="var(--mono)" font-size="10.5" fill="var(--text)">SET lock_key uuid NX PX 30000</text>
      <text x="375" y="88" text-anchor="middle" font-size="10" fill="var(--text2)">（只允许单个客户端成功抢占）</text>

      <!-- WatchDog -->
      <line x1="375" y1="105" x2="375" y2="135" stroke="var(--warn)" stroke-width="2" marker-end="url(#rd-arrow)"/>
      <rect x="240" y="135" width="270" height="65" rx="8" fill="var(--warn-soft)" stroke="var(--warn)" stroke-width="1.5"/>
      <text x="375" y="158" text-anchor="middle" font-size="12" font-weight="700" fill="var(--warn-text)">🐕 Redisson Watchdog (看门狗后台线程)</text>
      <text x="375" y="176" text-anchor="middle" font-size="10.5" fill="var(--text)">每隔 10s (leaseTime/3) 定时检测一次</text>
      <text x="375" y="190" text-anchor="middle" font-size="10" fill="var(--warn-text)">若业务未完成：自动重置超时时间为 30s，防止提前释放</text>

      <!-- Release Lock -->
      <line x1="490" y1="60" x2="550" y2="60" stroke="var(--success)" stroke-width="2" marker-end="url(#rd-arrow)"/>
      <rect x="550" y="30" width="160" height="60" rx="8" fill="var(--success-soft)" stroke="var(--success)" stroke-width="1.5"/>
      <text x="630" y="55" text-anchor="middle" font-size="12" font-weight="700" fill="var(--success-text)">业务结束 (解锁)</text>
      <text x="630" y="72" text-anchor="middle" font-size="10.5" fill="var(--text2)">Lua 校验 UUID 后 DEL</text>
    </svg>
  `,

  // 10. MQ 全链路消息不丢失
  "j-q1": `
    <svg viewBox="0 0 740 180" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:740px;height:auto;display:block;margin:0 auto;">
      <defs>
        <marker id="mq-arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1 L 10 5 L 0 9 z" fill="var(--accent)"/>
        </marker>
      </defs>

      <!-- Producer -->
      <rect x="20" y="35" width="190" height="110" rx="8" fill="var(--bg-elev-2)" stroke="var(--border)" stroke-width="1.5"/>
      <text x="115" y="60" text-anchor="middle" font-size="12.5" font-weight="700" fill="var(--text)">1. 生产端 Producer</text>
      <text x="115" y="85" text-anchor="middle" font-size="11" fill="var(--accent)">开启 Confirm 确认机制</text>
      <text x="115" y="105" text-anchor="middle" font-size="10" fill="var(--text2)">失败重试 / 本地消息表入库</text>
      <text x="115" y="125" text-anchor="middle" font-size="9.5" fill="var(--text3)">防止网络抖动发送丢失</text>

      <line x1="210" y1="90" x2="260" y2="90" stroke="var(--accent)" stroke-width="2" marker-end="url(#mq-arrow)"/>

      <!-- Broker -->
      <rect x="260" y="35" width="220" height="110" rx="8" fill="var(--accent-soft)" stroke="var(--accent)" stroke-width="1.5"/>
      <text x="370" y="60" text-anchor="middle" font-size="12.5" font-weight="700" fill="var(--accent)">2. 消息代理 Broker</text>
      <text x="370" y="85" text-anchor="middle" font-size="11" font-weight="600" fill="var(--text)">开启消息持久化 (Durable)</text>
      <text x="370" y="105" text-anchor="middle" font-size="10" fill="var(--text2)">集群多副本同步 (Replica)</text>
      <text x="370" y="125" text-anchor="middle" font-size="9.5" fill="var(--text3)">防止单点宕机丢失内存数据</text>

      <line x1="480" y1="90" x2="530" y2="90" stroke="var(--accent)" stroke-width="2" marker-end="url(#mq-arrow)"/>

      <!-- Consumer -->
      <rect x="530" y="35" width="190" height="110" rx="8" fill="var(--success-soft)" stroke="var(--success)" stroke-width="1.5"/>
      <text x="625" y="60" text-anchor="middle" font-size="12.5" font-weight="700" fill="var(--success-text)">3. 消费端 Consumer</text>
      <text x="625" y="85" text-anchor="middle" font-size="11" font-weight="600" fill="var(--success-text)">关闭自动 ACK (手动确认)</text>
      <text x="625" y="105" text-anchor="middle" font-size="10" fill="var(--text)">先完成本地业务事务</text>
      <text x="625" y="125" text-anchor="middle" font-size="9.5" fill="var(--text)">处理完毕再回复 basicAck</text>
    </svg>
  `,

  // 11. 秒杀架构与防超卖全链路
  "j-sc1": `
    <svg viewBox="0 0 740 220" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:740px;height:auto;display:block;margin:0 auto;">
      <defs>
        <marker id="sc-arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1 L 10 5 L 0 9 z" fill="var(--accent)"/>
        </marker>
      </defs>

      <!-- Step 1 -->
      <rect x="20" y="55" width="110" height="85" rx="8" fill="var(--bg-elev-2)" stroke="var(--border)" stroke-width="1.5"/>
      <text x="75" y="82" text-anchor="middle" font-size="12" font-weight="700" fill="var(--text)">1. 前端/网关</text>
      <text x="75" y="102" text-anchor="middle" font-size="10" fill="var(--text3)">按钮置灰防重提</text>
      <text x="75" y="118" text-anchor="middle" font-size="10" fill="var(--text3)">Nginx 验证码/限流</text>

      <line x1="130" y1="97" x2="165" y2="97" stroke="var(--accent)" stroke-width="2" marker-end="url(#sc-arrow)"/>

      <!-- Step 2 -->
      <rect x="165" y="45" width="165" height="105" rx="8" fill="var(--danger-soft)" stroke="var(--danger)" stroke-width="1.5"/>
      <text x="247" y="72" text-anchor="middle" font-size="12" font-weight="700" fill="var(--danger-text)">2. Redis 预扣库存</text>
      <text x="247" y="92" text-anchor="middle" font-size="10.5" font-weight="600" fill="var(--text)">原子 Lua 脚本</text>
      <text x="247" y="112" text-anchor="middle" font-size="10" fill="var(--text2)">判断库存 &gt; 0 则 decrby</text>
      <text x="247" y="130" text-anchor="middle" font-size="9.5" fill="var(--danger-text)">拦截 99% 的无效流量</text>

      <line x1="330" y1="97" x2="365" y2="97" stroke="var(--accent)" stroke-width="2" marker-end="url(#sc-arrow)"/>

      <!-- Step 3 -->
      <rect x="365" y="55" width="155" height="85" rx="8" fill="var(--accent-soft)" stroke="var(--accent)" stroke-width="1.5"/>
      <text x="442" y="82" text-anchor="middle" font-size="12" font-weight="700" fill="var(--accent)">3. 消息队列削峰</text>
      <text x="442" y="102" text-anchor="middle" font-size="10.5" fill="var(--text)">RocketMQ 异步排队</text>
      <text x="442" y="118" text-anchor="middle" font-size="10" fill="var(--text2)">订单服务匀速出队消费</text>

      <line x1="520" y1="97" x2="555" y2="97" stroke="var(--accent)" stroke-width="2" marker-end="url(#sc-arrow)"/>

      <!-- Step 4 -->
      <rect x="555" y="45" width="165" height="105" rx="8" fill="var(--success-soft)" stroke="var(--success)" stroke-width="1.5"/>
      <text x="637" y="72" text-anchor="middle" font-size="12" font-weight="700" fill="var(--success-text)">4. 数据库最终扣减</text>
      <text x="637" y="92" text-anchor="middle" font-size="10.5" font-weight="600" fill="var(--text)">防超卖 SQL 保底</text>
      <text x="637" y="112" text-anchor="middle" font-family="var(--mono)" font-size="9" fill="var(--text2)">UPDATE stock-1 WHERE stock&gt;0</text>
      <text x="637" y="130" text-anchor="middle" font-size="9.5" fill="var(--success-text)">数据库行锁防止超卖</text>
    </svg>
  `,

  // 12. Spring Boot 自动装配原理
  "j-s3": `
    <svg viewBox="0 0 740 180" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:740px;height:auto;display:block;margin:0 auto;">
      <defs>
        <marker id="sb-arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1 L 10 5 L 0 9 z" fill="var(--accent)"/>
        </marker>
      </defs>

      <!-- 1. Start -->
      <rect x="20" y="40" width="145" height="95" rx="8" fill="var(--bg-elev-2)" stroke="var(--border)" stroke-width="1.5"/>
      <text x="92" y="65" text-anchor="middle" font-size="11.5" font-weight="700" fill="var(--text)">@SpringBootApplication</text>
      <text x="92" y="85" text-anchor="middle" font-size="10.5" fill="var(--accent)">@EnableAutoConfiguration</text>
      <text x="92" y="105" text-anchor="middle" font-size="10" fill="var(--text3)">开启自动配置元注解</text>

      <line x1="165" y1="87" x2="195" y2="87" stroke="var(--accent)" stroke-width="1.8" marker-end="url(#sb-arrow)"/>

      <!-- 2. Import Selector -->
      <rect x="195" y="40" width="165" height="95" rx="8" fill="var(--accent-soft)" stroke="var(--accent)" stroke-width="1.5"/>
      <text x="277" y="65" text-anchor="middle" font-size="11.5" font-weight="700" fill="var(--accent)">AutoConfiguration</text>
      <text x="277" y="82" text-anchor="middle" font-size="11.5" font-weight="700" fill="var(--accent)">ImportSelector</text>
      <text x="277" y="105" text-anchor="middle" font-size="10" fill="var(--text2)">实现 DeferredImportSelector</text>

      <line x1="360" y1="87" x2="390" y2="87" stroke="var(--accent)" stroke-width="1.8" marker-end="url(#sb-arrow)"/>

      <!-- 3. Read imports file -->
      <rect x="390" y="40" width="170" height="95" rx="8" fill="var(--bg-elev)" stroke="var(--border)" stroke-width="1.5"/>
      <text x="475" y="65" text-anchor="middle" font-size="11" font-weight="700" fill="var(--text)">加载候选配置文件</text>
      <text x="475" y="85" text-anchor="middle" font-size="9" fill="var(--text3)">META-INF/spring/org.springframework</text>
      <text x="475" y="100" text-anchor="middle" font-size="9" fill="var(--text3)">.boot.autoconfigure.AutoConfiguration.imports</text>
      <text x="475" y="118" text-anchor="middle" font-size="10" fill="var(--text2)">(或 spring.factories)</text>

      <line x1="560" y1="87" x2="590" y2="87" stroke="var(--accent)" stroke-width="1.8" marker-end="url(#sb-arrow)"/>

      <!-- 4. Condition filter -->
      <rect x="590" y="40" width="130" height="95" rx="8" fill="var(--success-soft)" stroke="var(--success)" stroke-width="1.5"/>
      <text x="655" y="65" text-anchor="middle" font-size="11.5" font-weight="700" fill="var(--success-text)">@Conditional 过滤</text>
      <text x="655" y="85" text-anchor="middle" font-size="9.5" fill="var(--text)">OnClass 存在依赖</text>
      <text x="655" y="102" text-anchor="middle" font-size="9.5" fill="var(--text)">OnMissingBean 缺省</text>
      <text x="655" y="120" text-anchor="middle" font-size="9.5" font-weight="600" fill="var(--success-text)">按需注入 IOC</text>
    </svg>
  `,

  // 13. AI Agent Function Calling (工具调用时序)
  "a-a3": `
    <svg viewBox="0 0 740 260" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:740px;height:auto;display:block;margin:0 auto;">
      <defs>
        <marker id="fc-arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1 L 10 5 L 0 9 z" fill="var(--accent)"/>
        </marker>
      </defs>

      <rect x="40" y="20" width="140" height="36" rx="6" fill="var(--bg-elev-2)" stroke="var(--border)" stroke-width="1.5"/>
      <text x="110" y="43" text-anchor="middle" font-size="12" font-weight="700" fill="var(--text)">客户端 Client / Agent</text>
      <line x1="110" y1="56" x2="110" y2="240" stroke="var(--border)" stroke-width="2" stroke-dasharray="4 4"/>

      <rect x="300" y="20" width="140" height="36" rx="6" fill="var(--accent-soft)" stroke="var(--accent)" stroke-width="1.5"/>
      <text x="370" y="43" text-anchor="middle" font-size="12" font-weight="700" fill="var(--accent)">大语言模型 LLM</text>
      <line x1="370" y1="56" x2="370" y2="240" stroke="var(--accent)" stroke-width="1.5" stroke-dasharray="4 4"/>

      <rect x="560" y="20" width="140" height="36" rx="6" fill="var(--success-soft)" stroke="var(--success)" stroke-width="1.5"/>
      <text x="630" y="43" text-anchor="middle" font-size="12" font-weight="700" fill="var(--success-text)">真实工具 / API / DB</text>
      <line x1="630" y1="56" x2="630" y2="240" stroke="var(--success)" stroke-width="1.5" stroke-dasharray="4 4"/>

      <!-- 1: Send with Tools Schema -->
      <line x1="110" y1="85" x2="360" y2="85" stroke="var(--accent)" stroke-width="1.8" marker-end="url(#fc-arrow)"/>
      <text x="235" y="78" text-anchor="middle" font-size="11" fill="var(--text)">1. 用户请求 + tools 定义 (JSON Schema)</text>

      <!-- 2: LLM Decide Tool Call -->
      <line x1="370" y1="120" x2="120" y2="120" stroke="var(--accent)" stroke-width="1.8" marker-end="url(#fc-arrow)"/>
      <text x="245" y="113" text-anchor="middle" font-size="11" font-weight="600" fill="var(--accent)">2. 返回 tool_calls: {name, arguments}</text>

      <!-- 3: Execute Tool -->
      <line x1="110" y1="155" x2="620" y2="155" stroke="var(--success)" stroke-width="1.8" marker-end="url(#fc-arrow)"/>
      <text x="370" y="148" text-anchor="middle" font-size="11" fill="var(--success-text)">3. 本地执行工具 (如查询天气/执行 SQL)</text>

      <!-- 4: Tool Result -->
      <line x1="630" y1="185" x2="120" y2="185" stroke="var(--success)" stroke-width="1.8" marker-end="url(#fc-arrow)"/>
      <text x="370" y="178" text-anchor="middle" font-size="11" fill="var(--text2)">4. 工具返回执行结果 Observation</text>

      <!-- 5: Second LLM Call -->
      <line x1="110" y1="215" x2="360" y2="215" stroke="var(--accent)" stroke-width="1.8" marker-end="url(#fc-arrow)"/>
      <text x="235" y="208" text-anchor="middle" font-size="11" fill="var(--text)">5. 携带工具执行结果再次请求 LLM</text>
    </svg>
  `,

  // 14. SSE 流式输出打字机机制
  "a-e1": `
    <svg viewBox="0 0 740 220" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:740px;height:auto;display:block;margin:0 auto;">
      <defs>
        <marker id="sse-arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1 L 10 5 L 0 9 z" fill="var(--accent)"/>
        </marker>
      </defs>

      <rect x="80" y="20" width="150" height="38" rx="8" fill="var(--bg-elev-2)" stroke="var(--border)" stroke-width="1.5"/>
      <text x="155" y="44" text-anchor="middle" font-size="12" font-weight="700" fill="var(--text)">前端页面 Browser</text>
      <line x1="155" y1="58" x2="155" y2="200" stroke="var(--border)" stroke-width="2" stroke-dasharray="4 4"/>

      <rect x="510" y="20" width="150" height="38" rx="8" fill="var(--bg-elev-2)" stroke="var(--border)" stroke-width="1.5"/>
      <text x="585" y="44" text-anchor="middle" font-size="12" font-weight="700" fill="var(--text)">后端服务 Server</text>
      <line x1="585" y1="58" x2="585" y2="200" stroke="var(--border)" stroke-width="2" stroke-dasharray="4 4"/>

      <!-- Request -->
      <line x1="155" y1="80" x2="575" y2="80" stroke="var(--accent)" stroke-width="1.8" marker-end="url(#sse-arrow)"/>
      <text x="370" y="73" text-anchor="middle" font-size="11" fill="var(--text)">GET/POST 请求 (Accept: text/event-stream)</text>

      <!-- Stream Chunks -->
      <line x1="585" y1="110" x2="165" y2="110" stroke="var(--accent)" stroke-width="1.8" marker-end="url(#sse-arrow)"/>
      <text x="370" y="103" text-anchor="middle" font-family="var(--mono)" font-size="10.5" fill="var(--accent)">data: {"chunk": "你"}\\n\\n</text>

      <line x1="585" y1="135" x2="165" y2="135" stroke="var(--accent)" stroke-width="1.8" marker-end="url(#sse-arrow)"/>
      <text x="370" y="128" text-anchor="middle" font-family="var(--mono)" font-size="10.5" fill="var(--accent)">data: {"chunk": "好"}\\n\\n</text>

      <line x1="585" y1="160" x2="165" y2="160" stroke="var(--accent)" stroke-width="1.8" marker-end="url(#sse-arrow)"/>
      <text x="370" y="153" text-anchor="middle" font-family="var(--mono)" font-size="10.5" fill="var(--accent)">data: {"chunk": "！"}\\n\\n</text>

      <!-- Finish -->
      <line x1="585" y1="185" x2="165" y2="185" stroke="var(--success)" stroke-width="1.8" marker-end="url(#sse-arrow)"/>
      <text x="370" y="180" text-anchor="middle" font-family="var(--mono)" font-size="10.5" font-weight="600" fill="var(--success-text)">data: [DONE]\\n\\n (传输完毕关闭连接)</text>
    </svg>
  `,

  // 15. Netty 主从 Reactor 线程模型
  "p-io5": `
    <svg viewBox="0 0 740 230" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:740px;height:auto;display:block;margin:0 auto;">
      <defs>
        <marker id="nt-arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1 L 10 5 L 0 9 z" fill="var(--accent)"/>
        </marker>
      </defs>

      <!-- Client Requests -->
      <rect x="20" y="45" width="110" height="140" rx="8" fill="var(--bg-elev-2)" stroke="var(--border)" stroke-width="1.5"/>
      <text x="75" y="75" text-anchor="middle" font-size="12" font-weight="700" fill="var(--text)">客户端连接</text>
      <text x="75" y="98" text-anchor="middle" font-size="10" fill="var(--text3)">Client 1</text>
      <text x="75" y="120" text-anchor="middle" font-size="10" fill="var(--text3)">Client 2</text>
      <text x="75" y="142" text-anchor="middle" font-size="10" fill="var(--text3)">Client N</text>

      <line x1="130" y1="115" x2="175" y2="115" stroke="var(--accent)" stroke-width="2" marker-end="url(#nt-arrow)"/>

      <!-- BossGroup -->
      <rect x="175" y="30" width="220" height="170" rx="10" fill="var(--accent-soft)" stroke="var(--accent)" stroke-width="1.5"/>
      <text x="285" y="55" text-anchor="middle" font-size="13" font-weight="700" fill="var(--accent)">BossGroup (主 Reactor)</text>
      <text x="285" y="75" text-anchor="middle" font-size="11" fill="var(--text2)">专门处理接入客户端连接事件 (OP_ACCEPT)</text>

      <rect x="195" y="90" width="180" height="90" rx="6" fill="var(--bg-elev)" stroke="var(--border)" stroke-width="1"/>
      <text x="285" y="115" text-anchor="middle" font-size="11.5" font-weight="600" fill="var(--text)">NioEventLoop 线程池</text>
      <text x="285" y="135" text-anchor="middle" font-size="10.5" fill="var(--text3)">通过 Selector 轮询连接事件</text>
      <text x="285" y="155" text-anchor="middle" font-size="10" font-weight="600" fill="var(--success-text)">建立 Channel 分发给 Worker</text>

      <line x1="395" y1="115" x2="445" y2="115" stroke="var(--accent)" stroke-width="2" marker-end="url(#nt-arrow)"/>
      <text x="420" y="105" text-anchor="middle" font-size="10" fill="var(--accent)">注册 Channel</text>

      <!-- WorkerGroup -->
      <rect x="445" y="30" width="275" height="170" rx="10" fill="var(--success-soft)" stroke="var(--success)" stroke-width="1.5"/>
      <text x="582" y="55" text-anchor="middle" font-size="13" font-weight="700" fill="var(--success-text)">WorkerGroup (从 Reactor)</text>
      <text x="582" y="75" text-anchor="middle" font-size="11" fill="var(--text2)">专门处理数据读写 IO 事件 (OP_READ / WRITE)</text>

      <rect x="465" y="90" width="235" height="90" rx="6" fill="var(--bg-elev)" stroke="var(--border)" stroke-width="1"/>
      <text x="582" y="115" text-anchor="middle" font-size="11.5" font-weight="600" fill="var(--text)">ChannelPipeline 责任链</text>
      <text x="582" y="135" text-anchor="middle" font-size="10.5" fill="var(--text3)">Decoder → BusinessHandler → Encoder</text>
      <text x="582" y="155" text-anchor="middle" font-size="10" fill="var(--text2)">耗时业务可扔给单独业务线程池</text>
    </svg>
  `,

  // 16. TCP 三次握手
  "pack-h01": `
    <svg viewBox="0 0 720 300" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:720px;height:auto;display:block;margin:0 auto;">
      <defs>
        <marker id="tcp-arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1 L 10 5 L 0 9 z" fill="var(--accent)"/>
        </marker>
      </defs>

      <rect x="80" y="20" width="140" height="38" rx="8" fill="var(--bg-elev-2)" stroke="var(--border)" stroke-width="1.5"/>
      <text x="150" y="44" text-anchor="middle" font-size="13" font-weight="600" fill="var(--text)">客户端 Client</text>
      <line x1="150" y1="58" x2="150" y2="280" stroke="var(--border)" stroke-width="2" stroke-dasharray="4 4"/>

      <rect x="500" y="20" width="140" height="38" rx="8" fill="var(--bg-elev-2)" stroke="var(--border)" stroke-width="1.5"/>
      <text x="570" y="44" text-anchor="middle" font-size="13" font-weight="600" fill="var(--text)">服务端 Server (LISTEN)</text>
      <line x1="570" y1="58" x2="570" y2="280" stroke="var(--border)" stroke-width="2" stroke-dasharray="4 4"/>

      <line x1="150" y1="90" x2="560" y2="130" stroke="var(--accent)" stroke-width="2" marker-end="url(#tcp-arrow)"/>
      <rect x="270" y="90" width="180" height="24" rx="5" fill="var(--bg-elev)" stroke="var(--border)" stroke-width="1"/>
      <text x="360" y="106" text-anchor="middle" font-size="11.5" font-weight="600" fill="var(--accent)">1. SYN=1, seq=x</text>
      <text x="140" y="95" text-anchor="end" font-size="11" fill="var(--text3)">SYN_SENT</text>

      <line x1="570" y1="150" x2="160" y2="190" stroke="var(--accent)" stroke-width="2" marker-end="url(#tcp-arrow)"/>
      <rect x="250" y="150" width="220" height="24" rx="5" fill="var(--bg-elev)" stroke="var(--border)" stroke-width="1"/>
      <text x="360" y="166" text-anchor="middle" font-size="11.5" font-weight="600" fill="var(--accent)">2. SYN=1, ACK=1, seq=y, ack=x+1</text>
      <text x="580" y="155" text-anchor="start" font-size="11" fill="var(--text3)">SYN_RCVD</text>

      <line x1="150" y1="210" x2="560" y2="250" stroke="var(--accent)" stroke-width="2" marker-end="url(#tcp-arrow)"/>
      <rect x="270" y="210" width="180" height="24" rx="5" fill="var(--bg-elev)" stroke="var(--border)" stroke-width="1"/>
      <text x="360" y="226" text-anchor="middle" font-size="11.5" font-weight="600" fill="var(--accent)">3. ACK=1, seq=x+1, ack=y+1</text>
      <text x="140" y="215" text-anchor="end" font-size="11" font-weight="600" fill="var(--success-text)">ESTABLISHED</text>
      <text x="580" y="255" text-anchor="start" font-size="11" font-weight="600" fill="var(--success-text)">ESTABLISHED</text>
    </svg>
  `,

  // 17. TCP 四次挥手与 TIME_WAIT
  "pack-h03": `
    <svg viewBox="0 0 740 330" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:740px;height:auto;display:block;margin:0 auto;">
      <defs>
        <marker id="wave-arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1 L 10 5 L 0 9 z" fill="var(--accent)"/>
        </marker>
      </defs>

      <rect x="80" y="20" width="150" height="38" rx="8" fill="var(--bg-elev-2)" stroke="var(--border)" stroke-width="1.5"/>
      <text x="155" y="44" text-anchor="middle" font-size="13" font-weight="600" fill="var(--text)">主动关闭方 Client</text>
      <line x1="155" y1="58" x2="155" y2="310" stroke="var(--border)" stroke-width="2" stroke-dasharray="4 4"/>

      <rect x="510" y="20" width="150" height="38" rx="8" fill="var(--bg-elev-2)" stroke="var(--border)" stroke-width="1.5"/>
      <text x="585" y="44" text-anchor="middle" font-size="13" font-weight="600" fill="var(--text)">被动关闭方 Server</text>
      <line x1="585" y1="58" x2="585" y2="310" stroke="var(--border)" stroke-width="2" stroke-dasharray="4 4"/>

      <line x1="155" y1="85" x2="575" y2="115" stroke="var(--accent)" stroke-width="2" marker-end="url(#wave-arrow)"/>
      <text x="370" y="95" text-anchor="middle" font-size="11.5" font-weight="600" fill="var(--text)">1. FIN (seq=u)</text>
      <text x="145" y="85" text-anchor="end" font-size="11" fill="var(--text3)">FIN_WAIT_1</text>

      <line x1="585" y1="130" x2="165" y2="160" stroke="var(--accent)" stroke-width="2" marker-end="url(#wave-arrow)"/>
      <text x="370" y="140" text-anchor="middle" font-size="11.5" font-weight="600" fill="var(--text)">2. ACK (ack=u+1)</text>
      <text x="595" y="130" text-anchor="start" font-size="11" fill="var(--warn-text)">CLOSE_WAIT (待发完残余数据)</text>
      <text x="145" y="165" text-anchor="end" font-size="11" fill="var(--text3)">FIN_WAIT_2</text>

      <line x1="585" y1="185" x2="165" y2="215" stroke="var(--accent)" stroke-width="2" marker-end="url(#wave-arrow)"/>
      <text x="370" y="195" text-anchor="middle" font-size="11.5" font-weight="600" fill="var(--text)">3. FIN (seq=w, ack=u+1)</text>
      <text x="595" y="190" text-anchor="start" font-size="11" fill="var(--text3)">LAST_ACK</text>

      <line x1="155" y1="235" x2="575" y2="265" stroke="var(--accent)" stroke-width="2" marker-end="url(#wave-arrow)"/>
      <text x="370" y="245" text-anchor="middle" font-size="11.5" font-weight="600" fill="var(--text)">4. ACK (ack=w+1)</text>
      <text x="595" y="270" text-anchor="start" font-size="11" font-weight="600" fill="var(--success-text)">CLOSED</text>

      <rect x="50" y="245" width="95" height="50" rx="6" fill="var(--warn-soft)" stroke="var(--warn)" stroke-width="1.5"/>
      <text x="97" y="265" text-anchor="middle" font-size="11" font-weight="700" fill="var(--warn-text)">TIME_WAIT</text>
      <text x="97" y="283" text-anchor="middle" font-size="10" fill="var(--warn-text)">等待 2MSL</text>
    </svg>
  `,

  // 18. JVM 运行时数据区与分代堆
  "j-v1": `
    <svg viewBox="0 0 740 320" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:740px;height:auto;display:block;margin:0 auto;">
      <rect x="20" y="20" width="700" height="280" rx="12" fill="var(--bg-elev-2)" stroke="var(--border)" stroke-width="1.5"/>
      <text x="40" y="44" font-size="14" font-weight="700" fill="var(--text)">JVM 运行时数据区 (Runtime Data Area)</text>

      <rect x="40" y="60" width="370" height="220" rx="8" fill="var(--bg-elev)" stroke="var(--accent-border)" stroke-width="1.5"/>
      <text x="55" y="82" font-size="12.5" font-weight="700" fill="var(--accent)">线程共享区 (Shared Area)</text>

      <rect x="55" y="95" width="340" height="110" rx="6" fill="var(--accent-soft)" stroke="var(--accent)" stroke-width="1"/>
      <text x="70" y="115" font-size="12" font-weight="600" fill="var(--accent)">Java 堆 (Heap)</text>
      
      <rect x="70" y="125" width="180" height="65" rx="4" fill="var(--bg-elev)" stroke="var(--border)" stroke-width="1"/>
      <text x="80" y="142" font-size="11" font-weight="600" fill="var(--text)">新生代 (Young Generation)</text>
      <text x="80" y="160" font-size="10" fill="var(--text2)">Eden (8) : S0 (1) : S1 (1)</text>
      <text x="80" y="176" font-size="9.5" fill="var(--success-text)">Minor GC / 复制算法</text>

      <rect x="260" y="125" width="120" height="65" rx="4" fill="var(--bg-elev)" stroke="var(--border)" stroke-width="1"/>
      <text x="270" y="142" font-size="11" font-weight="600" fill="var(--text)">老年代 (Old Gen)</text>
      <text x="270" y="160" font-size="10" fill="var(--text2)">长期存活对象</text>
      <text x="270" y="176" font-size="9.5" fill="var(--warn-text)">Major / Full GC</text>

      <rect x="55" y="215" width="340" height="50" rx="6" fill="var(--bg-elev)" stroke="var(--border)" stroke-width="1"/>
      <text x="70" y="235" font-size="11.5" font-weight="600" fill="var(--text)">元空间 (Metaspace, JDK 8+ 移至本地内存)</text>
      <text x="70" y="252" font-size="10.5" fill="var(--text3)">类元数据、常量池、静态变量</text>

      <rect x="430" y="60" width="270" height="220" rx="8" fill="var(--bg-elev)" stroke="var(--border)" stroke-width="1.5"/>
      <text x="445" y="82" font-size="12.5" font-weight="700" fill="var(--text2)">线程私有区 (Per-thread Area)</text>

      <rect x="445" y="95" width="240" height="50" rx="6" fill="var(--bg-elev-2)" stroke="var(--border)" stroke-width="1"/>
      <text x="460" y="116" font-size="11.5" font-weight="600" fill="var(--text)">虚拟机栈 (Java Virtual Machine Stacks)</text>
      <text x="460" y="133" font-size="10" fill="var(--text3)">栈帧：局部变量表、操作数栈、动态链接</text>

      <rect x="445" y="155" width="240" height="50" rx="6" fill="var(--bg-elev-2)" stroke="var(--border)" stroke-width="1"/>
      <text x="460" y="176" font-size="11.5" font-weight="600" fill="var(--text)">本地方法栈 (Native Method Stacks)</text>
      <text x="460" y="193" font-size="10" fill="var(--text3)">支持 JNI Native C/C++ 方法执行</text>

      <rect x="445" y="215" width="240" height="50" rx="6" fill="var(--bg-elev-2)" stroke="var(--border)" stroke-width="1"/>
      <text x="460" y="236" font-size="11.5" font-weight="600" fill="var(--text)">程序计数器 (Program Counter Register)</text>
      <text x="460" y="253" font-size="10" fill="var(--text3)">当前线程正在执行的字节码指令地址</text>
    </svg>
  `,

  // 19. Spring Bean 生命周期
  "j-s1": `
    <svg viewBox="0 0 760 170" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:760px;height:auto;display:block;margin:0 auto;">
      <defs>
        <marker id="sp-arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1 L 10 5 L 0 9 z" fill="var(--accent)"/>
        </marker>
      </defs>

      <rect x="15" y="45" width="105" height="70" rx="8" fill="var(--bg-elev-2)" stroke="var(--border)" stroke-width="1.5"/>
      <text x="67" y="75" text-anchor="middle" font-size="12" font-weight="700" fill="var(--text)">1. 实例化</text>
      <text x="67" y="95" text-anchor="middle" font-size="10" fill="var(--text3)">反射创建对象</text>

      <line x1="120" y1="80" x2="140" y2="80" stroke="var(--accent)" stroke-width="2" marker-end="url(#sp-arrow)"/>

      <rect x="140" y="45" width="105" height="70" rx="8" fill="var(--bg-elev-2)" stroke="var(--border)" stroke-width="1.5"/>
      <text x="192" y="75" text-anchor="middle" font-size="12" font-weight="700" fill="var(--text)">2. 属性填充</text>
      <text x="192" y="95" text-anchor="middle" font-size="10" fill="var(--text3)">@Autowired 依赖注入</text>

      <line x1="245" y1="80" x2="265" y2="80" stroke="var(--accent)" stroke-width="2" marker-end="url(#sp-arrow)"/>

      <rect x="265" y="45" width="105" height="70" rx="8" fill="var(--accent-soft)" stroke="var(--accent-border)" stroke-width="1.5"/>
      <text x="317" y="75" text-anchor="middle" font-size="12" font-weight="700" fill="var(--accent)">3. Aware 注入</text>
      <text x="317" y="95" text-anchor="middle" font-size="10" fill="var(--accent)">BeanName/Context</text>

      <line x1="370" y1="80" x2="390" y2="80" stroke="var(--accent)" stroke-width="2" marker-end="url(#sp-arrow)"/>

      <rect x="390" y="30" width="125" height="100" rx="8" fill="var(--bg-elev)" stroke="var(--accent)" stroke-width="1.5"/>
      <text x="452" y="55" text-anchor="middle" font-size="12" font-weight="700" fill="var(--accent)">4. 初始化阶段</text>
      <text x="452" y="75" text-anchor="middle" font-size="10" fill="var(--text2)">BPP 前置处理</text>
      <text x="452" y="92" text-anchor="middle" font-size="10" font-weight="600" fill="var(--success-text)">@PostConstruct / init</text>
      <text x="452" y="110" text-anchor="middle" font-size="10" fill="var(--text2)">BPP 后置 (AOP动态代理)</text>

      <line x1="515" y1="80" x2="535" y2="80" stroke="var(--accent)" stroke-width="2" marker-end="url(#sp-arrow)"/>

      <rect x="535" y="45" width="100" height="70" rx="8" fill="var(--success-soft)" stroke="var(--success)" stroke-width="1.5"/>
      <text x="585" y="75" text-anchor="middle" font-size="12" font-weight="700" fill="var(--success-text)">5. 投入就绪</text>
      <text x="585" y="95" text-anchor="middle" font-size="10" fill="var(--success-text)">放入单例池使用</text>

      <line x1="635" y1="80" x2="655" y2="80" stroke="var(--accent)" stroke-width="2" marker-end="url(#sp-arrow)"/>

      <rect x="655" y="45" width="90" height="70" rx="8" fill="var(--danger-soft)" stroke="var(--danger)" stroke-width="1.5"/>
      <text x="700" y="75" text-anchor="middle" font-size="12" font-weight="700" fill="var(--danger-text)">6. 销毁</text>
      <text x="700" y="95" text-anchor="middle" font-size="10" fill="var(--danger-text)">@PreDestroy</text>
    </svg>
  `,

  // 20. RAG 端到端全链路
  "a-r1": `
    <svg viewBox="0 0 760 300" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:760px;height:auto;display:block;margin:0 auto;">
      <defs>
        <marker id="rag-arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1 L 10 5 L 0 9 z" fill="var(--accent)"/>
        </marker>
      </defs>

      <rect x="20" y="20" width="720" height="110" rx="10" fill="var(--bg-elev-2)" stroke="var(--border)" stroke-width="1.5"/>
      <text x="40" y="44" font-size="12.5" font-weight="700" fill="var(--text2)">阶段一：离线知识库构建 (Indexing Pipeline)</text>

      <rect x="40" y="60" width="120" height="50" rx="6" fill="var(--bg-elev)" stroke="var(--border)" stroke-width="1"/>
      <text x="100" y="82" text-anchor="middle" font-size="11.5" font-weight="600" fill="var(--text)">原始文档集</text>
      <text x="100" y="98" text-anchor="middle" font-size="10" fill="var(--text3)">PDF / MD / Word</text>

      <line x1="160" y1="85" x2="190" y2="85" stroke="var(--accent)" stroke-width="1.5" marker-end="url(#rag-arrow)"/>

      <rect x="190" y="60" width="130" height="50" rx="6" fill="var(--bg-elev)" stroke="var(--border)" stroke-width="1"/>
      <text x="255" y="82" text-anchor="middle" font-size="11.5" font-weight="600" fill="var(--text)">文本分块 (Chunking)</text>
      <text x="255" y="98" text-anchor="middle" font-size="10" fill="var(--text3)">固定大小 / 语义切分</text>

      <line x1="320" y1="85" x2="350" y2="85" stroke="var(--accent)" stroke-width="1.5" marker-end="url(#rag-arrow)"/>

      <rect x="350" y="60" width="140" height="50" rx="6" fill="var(--accent-soft)" stroke="var(--accent)" stroke-width="1"/>
      <text x="420" y="82" text-anchor="middle" font-size="11.5" font-weight="600" fill="var(--accent)">Embedding 向量化</text>
      <text x="420" y="98" text-anchor="middle" font-size="10" fill="var(--accent)">文本转密集向量</text>

      <line x1="490" y1="85" x2="520" y2="85" stroke="var(--accent)" stroke-width="1.5" marker-end="url(#rag-arrow)"/>

      <rect x="520" y="60" width="200" height="50" rx="6" fill="var(--success-soft)" stroke="var(--success)" stroke-width="1"/>
      <text x="620" y="82" text-anchor="middle" font-size="11.5" font-weight="600" fill="var(--success-text)">向量数据库 (Vector DB)</text>
      <text x="620" y="98" text-anchor="middle" font-size="10" fill="var(--success-text)">Milvus / PGVector / Qdrant</text>

      <rect x="20" y="150" width="720" height="130" rx="10" fill="var(--bg-elev-2)" stroke="var(--border)" stroke-width="1.5"/>
      <text x="40" y="174" font-size="12.5" font-weight="700" fill="var(--text2)">阶段二：在线检索与生成 (Retrieval & Generation)</text>

      <rect x="40" y="195" width="110" height="60" rx="6" fill="var(--bg-elev)" stroke="var(--border)" stroke-width="1"/>
      <text x="95" y="222" text-anchor="middle" font-size="11.5" font-weight="600" fill="var(--text)">用户提问 Query</text>
      <text x="95" y="240" text-anchor="middle" font-size="10" fill="var(--text3)">问句 Embedding</text>

      <line x1="150" y1="225" x2="180" y2="225" stroke="var(--accent)" stroke-width="1.5" marker-end="url(#rag-arrow)"/>

      <rect x="180" y="195" width="125" height="60" rx="6" fill="var(--accent-soft)" stroke="var(--accent)" stroke-width="1"/>
      <text x="242" y="222" text-anchor="middle" font-size="11.5" font-weight="600" fill="var(--accent)">语义相似度检索</text>
      <text x="242" y="240" text-anchor="middle" font-size="10" fill="var(--accent)">Top-K 粗筛召回</text>

      <line x1="305" y1="225" x2="335" y2="225" stroke="var(--accent)" stroke-width="1.5" marker-end="url(#rag-arrow)"/>

      <rect x="335" y="195" width="115" height="60" rx="6" fill="var(--accent-soft)" stroke="var(--accent)" stroke-width="1"/>
      <text x="392" y="222" text-anchor="middle" font-size="11.5" font-weight="600" fill="var(--accent)">重排 (Rerank)</text>
      <text x="392" y="240" text-anchor="middle" font-size="10" fill="var(--accent)">精排消歧/降噪</text>

      <line x1="450" y1="225" x2="480" y2="225" stroke="var(--accent)" stroke-width="1.5" marker-end="url(#rag-arrow)"/>

      <rect x="480" y="195" width="115" height="60" rx="6" fill="var(--bg-elev)" stroke="var(--border)" stroke-width="1"/>
      <text x="537" y="222" text-anchor="middle" font-size="11.5" font-weight="600" fill="var(--text)">Prompt 组装</text>
      <text x="537" y="240" text-anchor="middle" font-size="10" fill="var(--text3)">拼接 Context 上下文</text>

      <line x1="595" y1="225" x2="625" y2="225" stroke="var(--accent)" stroke-width="1.5" marker-end="url(#rag-arrow)"/>

      <rect x="625" y="195" width="100" height="60" rx="6" fill="var(--success-soft)" stroke="var(--success)" stroke-width="1"/>
      <text x="675" y="222" text-anchor="middle" font-size="11.5" font-weight="600" fill="var(--success-text)">LLM 生成回答</text>
      <text x="675" y="240" text-anchor="middle" font-size="10" fill="var(--success-text)">准确有根据输出</text>
    </svg>
  `,

  // 21. AI Agent 核心 ReAct 架构
  "a-a1": `
    <svg viewBox="0 0 740 260" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:740px;height:auto;display:block;margin:0 auto;">
      <defs>
        <marker id="ag-arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1 L 10 5 L 0 9 z" fill="var(--accent)"/>
        </marker>
        <marker id="ag-success" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1 L 10 5 L 0 9 z" fill="var(--success)"/>
        </marker>
      </defs>

      <rect x="20" y="90" width="100" height="50" rx="8" fill="var(--bg-elev-2)" stroke="var(--border)" stroke-width="1.5"/>
      <text x="70" y="112" text-anchor="middle" font-size="12" font-weight="700" fill="var(--text)">用户指令</text>
      <text x="70" y="128" text-anchor="middle" font-size="10" fill="var(--text3)">Goal / Query</text>

      <line x1="120" y1="115" x2="160" y2="115" stroke="var(--accent)" stroke-width="2" marker-end="url(#ag-arrow)"/>

      <rect x="160" y="20" width="410" height="210" rx="12" fill="var(--accent-soft)" stroke="var(--accent)" stroke-width="1.5" stroke-dasharray="6 4"/>
      <text x="180" y="44" font-size="12" font-weight="700" fill="var(--accent)">ReAct 闭环循环 (Reasoning + Acting Loop)</text>

      <rect x="185" y="65" width="160" height="55" rx="8" fill="var(--bg-elev)" stroke="var(--border)" stroke-width="1.2"/>
      <text x="265" y="90" text-anchor="middle" font-size="12" font-weight="700" fill="var(--text)">💭 Thought (推理思考)</text>
      <text x="265" y="108" text-anchor="middle" font-size="10.5" fill="var(--text3)">当前状态如何？下一步做什么？</text>

      <line x1="345" y1="92" x2="385" y2="92" stroke="var(--accent)" stroke-width="1.8" marker-end="url(#ag-arrow)"/>

      <rect x="385" y="65" width="165" height="55" rx="8" fill="var(--bg-elev)" stroke="var(--border)" stroke-width="1.2"/>
      <text x="467" y="90" text-anchor="middle" font-size="12" font-weight="700" fill="var(--text)">⚡ Action (行动决策)</text>
      <text x="467" y="108" text-anchor="middle" font-size="10.5" fill="var(--text3)">选择工具/API 及参数 payload</text>

      <line x1="467" y1="120" x2="467" y2="150" stroke="var(--accent)" stroke-width="1.8" marker-end="url(#ag-arrow)"/>

      <rect x="385" y="150" width="165" height="60" rx="8" fill="var(--bg-elev)" stroke="var(--border)" stroke-width="1.2"/>
      <text x="467" y="174" text-anchor="middle" font-size="12" font-weight="700" fill="var(--accent)">🛠️ Tool Execution</text>
      <text x="467" y="192" text-anchor="middle" font-size="10" fill="var(--text2)">执行搜索 / DB 查询 / 计算</text>

      <line x1="385" y1="180" x2="265" y2="180" stroke="var(--accent)" stroke-width="1.8"/>
      <line x1="265" y1="180" x2="265" y2="125" stroke="var(--accent)" stroke-width="1.8" marker-end="url(#ag-arrow)"/>

      <rect x="185" y="145" width="160" height="30" rx="5" fill="var(--bg-elev-2)" stroke="var(--border)" stroke-width="1"/>
      <text x="265" y="165" text-anchor="middle" font-size="11" font-weight="600" fill="var(--text2)">👁️ Observation 观察结果</text>

      <line x1="570" y1="92" x2="610" y2="92" stroke="var(--success)" stroke-width="2" marker-end="url(#ag-success)"/>
      <text x="590" y="84" text-anchor="middle" font-size="10" font-weight="600" fill="var(--success)">目标达成</text>

      <rect x="610" y="65" width="110" height="55" rx="8" fill="var(--success-soft)" stroke="var(--success)" stroke-width="1.5"/>
      <text x="665" y="90" text-anchor="middle" font-size="12" font-weight="700" fill="var(--success-text)">Final Answer</text>
      <text x="665" y="108" text-anchor="middle" font-size="10" fill="var(--success-text)">交付最终结果</text>
    </svg>
  `
};

// Aliases for related questions to share diagrams
window.DIAGRAMS["p-net1"] = window.DIAGRAMS["pack-h01"];
window.DIAGRAMS["j-s2"] = window.DIAGRAMS["j-s1"];
window.DIAGRAMS["p2-4"] = window.DIAGRAMS["j-col1"];
window.DIAGRAMS["p-m1"] = window.DIAGRAMS["j-m3"];
window.DIAGRAMS["p2-25"] = window.DIAGRAMS["j-r1"];
window.DIAGRAMS["p2-28"] = window.DIAGRAMS["j-q1"];
window.DIAGRAMS["p2-33"] = window.DIAGRAMS["j-sc1"];
window.DIAGRAMS["a-r2"] = window.DIAGRAMS["a-r1"];
window.DIAGRAMS["a-a2"] = window.DIAGRAMS["a-a1"];
